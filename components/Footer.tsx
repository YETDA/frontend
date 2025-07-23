"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white mt-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">회사 정보</h3>
          <p className="text-secondary-300 mb-4">
            기술 창작자와 후원자를 연결하는 플랫폼입니다. 혁신적인 아이디어가
            현실이 되는 곳에서 함께하세요.
          </p>
          <div className="flex space-x-4">
            <Link
              href="https://twitter.com"
              passHref
              className="text-secondary-300 hover:text-white transition-colors"
            >
              <span className="sr-only">Twitter</span>

              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 ..." />
              </svg>
            </Link>
            <Link
              href="https://github.com"
              passHref
              className="text-secondary-300 hover:text-white transition-colors"
            >
              <span className="sr-only">GitHub</span>

              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 ..." />
              </svg>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">서비스</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/projects"
                className="text-secondary-300 hover:text-white transition-colors"
              >
                프로젝트 후원
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="text-secondary-300 hover:text-white transition-colors"
              >
                제품 구매
              </Link>
            </li>
            <li>
              <Link
                href="/create-project"
                className="text-secondary-300 hover:text-white transition-colors"
              >
                프로젝트 등록
              </Link>
            </li>
            <li>
              <Link
                href="/create-product"
                className="text-secondary-300 hover:text-white transition-colors"
              >
                제품 등록
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">고객지원</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/help"
                className="text-secondary-300 hover:text-white transition-colors"
              >
                도움말
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-secondary-300 hover:text-white transition-colors"
              >
                문의하기
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-secondary-300 hover:text-white transition-colors"
              >
                이용약관
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-secondary-300 hover:text-white transition-colors"
              >
                개인정보처리방침
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">문의 사항</h3>
          <Link
            href="/contact"
            className="text-secondary-300 hover:text-white transition-colors block"
          >
            문의 하기
          </Link>
        </div>
      </div>

      <div className="border-t border-secondary-700 mt-8 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-300 text-sm">
            © 2025 TechFunding. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/terms"
              className="text-secondary-300 hover:text-white text-sm transition-colors"
            >
              이용약관
            </Link>
            <Link
              href="/privacy"
              className="text-secondary-300 hover:text-white text-sm transition-colors"
            >
              개인정보처리방침
            </Link>
            <Link
              href="/contact"
              className="text-secondary-300 hover:text-white text-sm transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
