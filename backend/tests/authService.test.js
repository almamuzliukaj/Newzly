const bcrypt = require('bcryptjs');

// AuthenticationService class for email validation and password hashing/verification
class AuthenticationService {
  validateEmail(email) {
    // Regex to check if the email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  hashPassword(password) {
    // Generate a salt and hash the password synchronously
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  verifyPassword(password, hashed) {
    // Compare plain password with hashed password synchronously
    return bcrypt.compareSync(password, hashed);
  }
}

// Jest test suite for AuthenticationService
describe('Authentication Service', () => {
  const authService = new AuthenticationService();

  test('should validate correct email format', () => {
    expect(authService.validateEmail('user@example.com')).toBe(true);
    expect(authService.validateEmail('invalid-email')).toBe(false);
  });

  test('should hash password correctly', () => {
    const password = 'myPassword123';
    const hashed = authService.hashPassword(password);

    // Hashed password should not be the same as the plain password
    expect(hashed).not.toBe(password);

    // Password verification should return true for correct password
    expect(authService.verifyPassword(password, hashed)).toBe(true);
  });
});
