import Link from 'next/link'


export default function Navbar() {

  return <div className="main_navbar">
    <nav className="nav">
      <div className="nav_item">
        <Link href="/">
          <a>Случайные слова</a>
        </Link>
      </div>
      <div className="nav_item">
        <Link href="/addWords">
          <a>Добавить слова</a>
        </Link>
      </div>
      <div className="nav_head">
        MyEngl
      </div>
      <div className="nav_item">
        <Link href="/dictionaries">
          <a>Словари</a>
        </Link>
      </div>
      <div className="nav_item">
        <Link href="/">
          <a>Go</a>
        </Link>
      </div>
    </nav>
  </div>
};