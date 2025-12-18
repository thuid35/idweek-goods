export default function AdminLayout({ children }) {
  return children;
}

// 這個函數會在伺服器端執行，強制要求 HTTP Basic Auth
export async function generateMetadata() {
  return {
    title: '管理員後台',
  };
}
