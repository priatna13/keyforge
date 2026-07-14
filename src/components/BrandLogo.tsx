type Props = {
  /** Tinggi logo (CSS). Default header. */
  className?: string
  /** Tampilkan teks merek di samping (logo file hanya ikon). Default true. */
  showWordmark?: boolean
}

export function BrandLogo({
  className = 'h-28 w-auto',
  showWordmark = true,
}: Props) {
  return (
    <span className="inline-flex items-center gap-4">
      <img
        src="/logo.png?v=4"
        alt="KeyForge"
        className={`object-contain object-center ${className}`}
        width={400}
        height={400}
      />
      {showWordmark && (
        <span className="kf-title bg-gradient-to-r from-cyan-300 via-cyan-200 to-orange-400 bg-clip-text text-3xl text-transparent sm:text-5xl">
          KeyForge
        </span>
      )}
    </span>
  )
}
