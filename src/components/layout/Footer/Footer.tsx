import Link from 'next/link'

const footerLinks = [
  { href: '/ai-recommend', label: '선물 추천받기' },
  { href: '/feed', label: '피드 둘러보기' },
  { href: '/fortune', label: '오늘의 운세' },
  { href: '/brand', label: '브랜드 이야기: 메종카도' },
  { href: '/contact', label: '문의하기' },
]

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Content */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Gifts, refined and personalized</h3>
            <div className="text-sm text-gray-400 space-y-1">
              <p>선물은 물건이 아니라, 마음의 선택입니다</p>
              <p>우리는 고민의 방향을 정리해주는 역할을 합니다</p>
              <p>관계와 취향, 그리고 순간을 읽어</p>
              <p>가장 어울리는 제안을 건넵니다</p>
            </div>
          </div>

          {/* Right Links */}
          <div className="flex flex-col items-start md:items-end gap-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="font-serif text-4xl md:text-5xl italic">
            Find your Gift
          </div>
          <div className="text-right">
            <div className="text-lg font-medium tracking-wide">MAISON CADEAU</div>
            <div className="text-xs text-gray-500 mt-1">
              © 2026 Gift Project. All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
