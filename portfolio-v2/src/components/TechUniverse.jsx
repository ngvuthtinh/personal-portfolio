import { useEffect, useMemo, useRef } from "react";
import { FiMinus, FiPlus, FiRotateCcw } from "react-icons/fi";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { orbits } from "./techOrbits";

const SUN_RADIUS = 1.25;
const START = new THREE.Vector3(0, 7, 12.5);

// Narrow (portrait) frames need the camera further back so the outer orbits fit
const startFor = (aspect) => START.clone().multiplyScalar(aspect < 0.9 ? 1.6 : aspect < 1.3 ? 1.25 : 1);
const MIN_DIST = 5;
const MAX_DIST = 24;
const planets = orbits.flatMap((o, oi) => o.planets.map((p, i) => ({ ...p, oi, i, count: o.planets.length })));

const sunVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vPos;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPos = position;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

// Animated plasma surface: fbm noise blended across a violet → white-hot → cyan palette, brighter rim
const sunFragment = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPos;
  varying vec3 vView;

  float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
  float noise(vec3 p) {
    vec3 i = floor(p); vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z);
  }
  float fbm(vec3 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  void main() {
    vec3 p = vPos * 2.4;
    float n = fbm(p + vec3(uTime * 0.12, uTime * 0.08, -uTime * 0.1));
    float n2 = fbm(p * 1.8 - vec3(0.0, uTime * 0.15, 0.0));
    float plasma = smoothstep(0.25, 0.85, n * 0.7 + n2 * 0.45);

    vec3 deep = vec3(0.32, 0.16, 0.78);
    vec3 violet = vec3(0.66, 0.55, 0.98);
    vec3 hot = vec3(0.98, 0.95, 1.0);
    vec3 cyan = vec3(0.4, 0.91, 0.98);

    vec3 col = mix(deep, violet, plasma);
    col = mix(col, hot, smoothstep(0.6, 1.0, plasma) * 0.85);
    float rim = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
    col = mix(col, cyan, rim * 0.75);
    col += rim * 0.35;
    gl_FragColor = vec4(col, 1.0);
  }
`;

// Soft radial glow texture for the corona sprites
function makeGlowTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.2, "rgba(196,181,253,0.65)");
  g.addColorStop(0.45, "rgba(139,92,246,0.22)");
  g.addColorStop(0.7, "rgba(103,232,249,0.06)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function Sun() {
  const surface = useRef();
  const corona = useRef();
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  const glow = useMemo(makeGlowTexture, []);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    uniforms.uTime.value = t;
    surface.current.rotation.y += dt * 0.08;
    corona.current.scale.setScalar(6.5 + Math.sin(t * 1.3) * 0.3);
  });

  return (
    <group>
      <mesh ref={surface}>
        <sphereGeometry args={[SUN_RADIUS, 64, 64]} />
        <shaderMaterial vertexShader={sunVertex} fragmentShader={sunFragment} uniforms={uniforms} />
      </mesh>
      <sprite ref={corona}>
        <spriteMaterial map={glow} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.9} />
      </sprite>
      <sprite scale={11}>
        <spriteMaterial map={glow} transparent blending={THREE.AdditiveBlending} depthWrite={false} opacity={0.18} color="#67e8f9" />
      </sprite>
      <pointLight intensity={60} distance={30} color="#e9d5ff" />
    </group>
  );
}

function Orbit({ orbit, oi, paused, anchors }) {
  const spin = useRef();
  useFrame((_, dt) => {
    if (!paused.current) spin.current.rotation.y += dt * orbit.speed;
  });
  return (
    <group rotation={[orbit.tilt[0], 0, orbit.tilt[1]]}>
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[orbit.r, 0.008, 8, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </mesh>
      <group ref={spin}>
        {orbit.planets.map(({ name }, i) => {
          const a = (i / orbit.planets.length) * Math.PI * 2;
          return (
            <group
              key={name}
              ref={(el) => {
                anchors.current[`${oi}-${i}`] = el;
              }}
              position={[Math.cos(a) * orbit.r, 0, Math.sin(a) * orbit.r]}
            />
          );
        })}
      </group>
    </group>
  );
}

const _pos = new THREE.Vector3();
const _toPlanet = new THREE.Vector3();
const _toSun = new THREE.Vector3();

// Projects every planet anchor to screen space and moves its DOM badge there
function Projector({ anchors, badges }) {
  useFrame(({ camera, size }) => {
    _toSun.copy(camera.position).negate();
    const sunDist = _toSun.length();
    const sunAngle = Math.asin(Math.min(1, (SUN_RADIUS * 1.15) / sunDist));

    for (const key in anchors.current) {
      const anchor = anchors.current[key];
      const badge = badges.current[key];
      if (!anchor || !badge) continue;
      anchor.getWorldPosition(_pos);
      _toPlanet.copy(_pos).sub(camera.position);
      const dist = _toPlanet.length();
      const behindSun = dist > sunDist && _toPlanet.angleTo(_toSun) < sunAngle;

      _pos.project(camera);
      const x = (_pos.x * 0.5 + 0.5) * size.width;
      const y = (-_pos.y * 0.5 + 0.5) * size.height;
      const scale = Math.min(2.2, Math.max(0.5, 16 / dist));
      badge.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
      badge.style.zIndex = String(Math.round(1000 - dist * 10));
      badge.style.opacity = behindSun ? "0.12" : "1";
    }
  });
  return null;
}

// OrbitControls sets touch-action: none, which traps one-finger vertical swipes on phones.
// pan-y hands vertical swipes back to the page (scroll) while horizontal swipes still rotate.
function TouchScroll() {
  const controls = useThree((s) => s.controls);
  useEffect(() => {
    if (controls) controls.domElement.style.touchAction = "pan-y";
  }, [controls]);
  return null;
}

// Compile shaders while the scene is still off-screen so the first visible frame doesn't stutter
function Precompile() {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    gl.compile(scene, camera);
  }, [gl, scene, camera]);
  return null;
}

// Re-frames the camera whenever the canvas aspect ratio class changes (e.g. phone rotation)
function FitCamera() {
  const controls = useThree((s) => s.controls);
  const aspect = useThree((s) => s.size.width / s.size.height);
  const bucket = aspect < 0.9 ? 0 : aspect < 1.3 ? 1 : 2;
  useEffect(() => {
    if (!controls) return;
    controls.object.position.copy(startFor(aspect));
    controls.update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, bucket]);
  return null;
}

export default function TechUniverse({ active = true }) {
  const paused = useRef(false);
  const anchors = useRef({});
  const badges = useRef({});
  const controls = useRef();

  const zoom = (factor) => {
    const c = controls.current;
    if (!c) return;
    const cam = c.object;
    const dist = THREE.MathUtils.clamp(cam.position.length() * factor, MIN_DIST, MAX_DIST);
    cam.position.setLength(dist);
    c.update();
  };
  const reset = () => {
    const c = controls.current;
    if (!c) return;
    const { clientWidth: w, clientHeight: h } = c.domElement;
    c.object.position.copy(startFor(w / h));
    c.update();
  };

  return (
    <div className="tech-universe">
      <Canvas
        camera={{ position: START.toArray(), fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.25} />
        <Stars radius={50} depth={40} count={1800} factor={3} saturation={0} fade speed={0.6} />
        <Sun />
        {orbits.map((o, oi) => (
          <Orbit key={oi} orbit={o} oi={oi} paused={paused} anchors={anchors} />
        ))}
        <Projector anchors={anchors} badges={badges} />
        <TouchScroll />
        <FitCamera />
        <Precompile />
        <OrbitControls
          ref={controls}
          makeDefault
          enablePan={false}
          enableZoom
          zoomSpeed={0.6}
          minDistance={MIN_DIST}
          maxDistance={MAX_DIST}
          enableDamping
          autoRotate
          autoRotateSpeed={0.25}
          minPolarAngle={Math.PI * 0.15}
          maxPolarAngle={Math.PI * 0.85}
        />
      </Canvas>

      <div className="zoom-controls">
        <button type="button" aria-label="Zoom in" onClick={() => zoom(0.8)}><FiPlus /></button>
        <button type="button" aria-label="Zoom out" onClick={() => zoom(1.25)}><FiMinus /></button>
        <button type="button" aria-label="Reset view" onClick={reset}><FiRotateCcw /></button>
      </div>

      <div className="planet-layer">
        {planets.map(({ name, Icon, color, oi, i }) => (
          <div
            key={name}
            ref={(el) => {
              badges.current[`${oi}-${i}`] = el;
            }}
            className="planet3d-wrap"
          >
            <div
              className="planet3d"
              style={{ "--c": color }}
              onPointerEnter={() => (paused.current = true)}
              onPointerLeave={() => (paused.current = false)}
            >
              <Icon />
              <span>{name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
