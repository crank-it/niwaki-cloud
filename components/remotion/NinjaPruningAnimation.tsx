'use client'

import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion'

// Animated Tree Component - transforms from bushy to cloud-pruned
const Tree = ({ progress }: { progress: number }) => {
  // Branches that will be "pruned"
  const branches = [
    { path: "M200,280 Q160,260 130,270", cloudX: 120, cloudY: 260 },
    { path: "M200,280 Q240,260 270,270", cloudX: 280, cloudY: 260 },
    { path: "M200,220 Q150,200 120,210", cloudX: 110, cloudY: 200 },
    { path: "M200,220 Q250,200 280,210", cloudX: 290, cloudY: 200 },
    { path: "M200,160 Q170,140 140,150", cloudX: 130, cloudY: 140 },
    { path: "M200,160 Q230,140 260,150", cloudX: 270, cloudY: 140 },
    { path: "M200,120 Q200,80 200,60", cloudX: 200, cloudY: 50 },
  ]

  return (
    <g>
      {/* Ground/moss */}
      <ellipse cx="200" cy="410" rx="80" ry="15" fill="#4a5d4a" opacity={0.6} />

      {/* Trunk */}
      <path
        d="M200,400 Q195,350 200,300 Q205,250 200,200 Q195,150 200,120"
        stroke="#5d4037"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
      />

      {/* Branches and foliage */}
      {branches.map((branch, i) => {
        const branchProgress = interpolate(
          progress,
          [i * 0.1, i * 0.1 + 0.15],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )

        const bushyOpacity = interpolate(branchProgress, [0, 0.5], [1, 0], { extrapolateRight: 'clamp' })
        const cloudOpacity = interpolate(branchProgress, [0.3, 1], [0, 1], { extrapolateLeft: 'clamp' })
        const cloudScale = interpolate(branchProgress, [0.3, 1], [0.5, 1], { extrapolateLeft: 'clamp' })

        return (
          <g key={i}>
            <path d={branch.path} stroke="#5d4037" strokeWidth="4" fill="none" strokeLinecap="round" />

            {/* Bushy foliage */}
            <ellipse cx={branch.cloudX} cy={branch.cloudY} rx={35} ry={25} fill="#2d5a2d" opacity={bushyOpacity} />
            <ellipse cx={branch.cloudX + 10} cy={branch.cloudY - 5} rx={25} ry={20} fill="#3d6a3d" opacity={bushyOpacity} />

            {/* Cloud pad */}
            <g style={{ transform: `translate(${branch.cloudX}px, ${branch.cloudY}px) scale(${cloudScale})`, transformOrigin: `${branch.cloudX}px ${branch.cloudY}px` }} opacity={cloudOpacity}>
              <ellipse cx={branch.cloudX} cy={branch.cloudY} rx="22" ry="12" fill="#1a4a1a" />
              <ellipse cx={branch.cloudX} cy={branch.cloudY - 3} rx="18" ry="9" fill="#2d5a2d" />
              <ellipse cx={branch.cloudX} cy={branch.cloudY - 5} rx="12" ry="6" fill="#3d7a3d" />
            </g>
          </g>
        )
      })}
    </g>
  )
}

// Animated Ninja
const Ninja = ({ frame, progress }: { frame: number; progress: number }) => {
  const { fps } = useVideoConfig()

  const ninjaX = interpolate(progress, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1], [80, 300, 70, 310, 60, 290, 200, 200], { extrapolateRight: 'clamp' })
  const ninjaY = interpolate(progress, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1], [300, 300, 240, 240, 180, 180, 100, 350], { extrapolateRight: 'clamp' })
  const ninjaScale = interpolate(ninjaY, [100, 350], [0.6, 1])

  const jumpOffset = spring({ frame: frame % 20, fps, config: { damping: 10, stiffness: 100 } }) * -10
  const facingRight = ninjaX < 200

  return (
    <g style={{ transform: `translate(${ninjaX}px, ${ninjaY + jumpOffset}px) scale(${ninjaScale * (facingRight ? 1 : -1)}, ${ninjaScale})` }}>
      <ellipse cx="0" cy="0" rx="15" ry="20" fill="#1a1a2e" />
      <circle cx="0" cy="-28" r="12" fill="#1a1a2e" />
      <ellipse cx="-4" cy="-30" rx="3" ry="2" fill="#fff" />
      <ellipse cx="4" cy="-30" rx="3" ry="2" fill="#fff" />
      <circle cx="-4" cy="-30" r="1" fill="#000" />
      <circle cx="4" cy="-30" r="1" fill="#000" />
      <rect x="-14" y="-35" width="28" height="4" fill="#c41e3a" rx="1" />
      <path d="M14,-33 Q25,-30 20,-25" stroke="#c41e3a" strokeWidth="3" fill="none" />

      <g transform="translate(18, -5)">
        <rect x="0" y="-3" width="20" height="6" fill="#1a1a2e" rx="3" />
        <g transform="translate(22, 0)">
          <ellipse cx="-5" cy="0" rx="6" ry="4" fill="#4a4a4a" />
          <line x1="0" y1="0" x2="25" y2={Math.sin(frame * 0.3) * 3} stroke="#c0c0c0" strokeWidth="3" strokeLinecap="round" />
          <line x1="0" y1="0" x2="25" y2={-Math.sin(frame * 0.3) * 3} stroke="#a0a0a0" strokeWidth="3" strokeLinecap="round" />
          <circle cx="0" cy="0" r="3" fill="#666" />
        </g>
      </g>

      <rect x="-8" y="18" width="6" height="15" fill="#1a1a2e" rx="2" />
      <rect x="2" y="18" width="6" height="15" fill="#1a1a2e" rx="2" />
    </g>
  )
}

// Main composition
export const NinjaPruningAnimation: React.FC = () => {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()

  const progress = interpolate(frame, [0, durationInFrames - 30], [0, 1], { extrapolateRight: 'clamp' })
  const bgHue = interpolate(frame, [0, durationInFrames], [120, 140])

  return (
    <AbsoluteFill style={{ backgroundColor: `hsl(${bgHue}, 15%, 95%)` }}>
      <svg viewBox="0 0 400 450" style={{ width: '100%', height: '100%' }}>
        <defs>
          <pattern id="zen-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="#d4d4d4" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="400" height="450" fill="url(#zen-pattern)" />

        <circle
          cx="200"
          cy="200"
          r={interpolate(frame, [0, 60], [0, 150], { extrapolateRight: 'clamp' })}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="2"
          opacity={0.5}
        />

        <Tree progress={progress} />
        <Ninja frame={frame} progress={progress} />

        <text x="200" y="435" textAnchor="middle" fill="#78716c" fontSize="14" fontFamily="serif">
          {progress < 1 ? '剪定中...' : '完成'}
        </text>
      </svg>
    </AbsoluteFill>
  )
}
