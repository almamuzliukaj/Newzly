// authService.test.js

const bcrypt = require('bcryptjs');

class AuthenticationService {
  validateEmail(email) {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
  }

  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  verifyPassword(password, hashed) {
    return bcrypt.compareSync(password, hashed);
  }
}

describe('Authentication Service', () => {
  const authService = new AuthenticationService();

  test('should validate correct email format', () => {
    expect(authService.validateEmail('user@example.com')).toBe(true);
    expect(authService.validateEmail('invalid-email')).toBe(false);
  });

  test('should hash password correctly', () => {
    const password = 'myPassword123';
    const hashed = authService.hashPassword(password);

    expect(hashed).not.toBe(password);
    expect(authService.verifyPassword(password, hashed)).toBe(true);
  });
});
