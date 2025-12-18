import { NextResponse } from 'next/server';

// 管理員帳號密碼（實際應用中應該使用環境變數）
const ADMIN_USERNAME = 'thuid';
const ADMIN_PASSWORD = 'thuid1274';

export async function GET(request) {
  // 取得 Authorization header
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    // 沒有認證資訊，返回 401 並要求認證
    return new NextResponse(
      '<!DOCTYPE html><html><body><h1>需要認證</h1></body></html>',
      {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Area", charset="UTF-8"',
          'Content-Type': 'text/html; charset=utf-8',
        },
      }
    );
  }

  // 解析 Basic Auth
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  // 驗證帳號密碼
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return new NextResponse(
      '<!DOCTYPE html><html><body><script>window.parent.postMessage("auth-success", "*");</script><h1>認證成功</h1></body></html>',
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      }
    );
  }

  // 認證失敗
  return new NextResponse(
    '<!DOCTYPE html><html><body><h1>認證失敗</h1></body></html>',
    {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Area", charset="UTF-8"',
        'Content-Type': 'text/html; charset=utf-8',
      },
    }
  );
}

