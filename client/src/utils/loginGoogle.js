import { login_google } from 'store/slices/authSlice';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { dispatch } from 'store';

export function checkLoginGoogle() {
  const handleCallbackResponse = async (response) => {
    var userObject = jwtDecode(response.credential);
    const value = { user_email: userObject.email };
    try {
      const result = await dispatch(login_google(value));
      if (result && !result.error) {
        toast.success('Đăng nhập thành công');
      } else {
        toast.error('Vui lòng liên kết email với tài khoản!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loginGoogle = () => {
    google.accounts.id.initialize({
      client_id: '387483545489-muknqkprotf0b41nlgai6msu2dqf8ftt.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });
    google.accounts.id.prompt();
  };

  loginGoogle();
}
