# Contributing to EduPay Mobile

Thank you for your interest in contributing to EduPay Mobile! This document provides guidelines and information for contributors.

## 🚀 Getting Started

1. **Fork the repository** and clone your fork locally
2. **Install dependencies**: `npm install`
3. **Start development server**: `ionic serve`
4. **Create a feature branch**: `git checkout -b feature/your-feature-name`

## 📝 Code Style Guidelines

### TypeScript/Angular
- Use TypeScript strict mode
- Follow Angular style guide conventions
- Use standalone components where possible
- Implement proper error handling
- Use async/await for asynchronous operations

### Naming Conventions
- **Components**: PascalCase (e.g., `HomePage`, `FileManagerService`)
- **Methods**: camelCase (e.g., `openEduPay`, `downloadFile`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `EDUPAY_URL`)
- **Files**: kebab-case (e.g., `home.page.ts`, `file-manager.service.ts`)

### Code Organization
- Keep components focused and single-responsibility
- Use services for business logic and data management
- Group related functionality together
- Maintain clean imports and exports

## 🧪 Testing

- Write unit tests for new features
- Ensure all tests pass: `npm test`
- Test on multiple devices/screen sizes
- Verify both web and mobile functionality

## 📋 Commit Guidelines

Use conventional commit messages:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for test additions/modifications

Example: `feat: add file sharing functionality`

## 🔍 Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Run linting**: `npm run lint`
4. **Ensure all tests pass**: `npm test`
5. **Update CHANGELOG** if applicable
6. **Submit PR** with clear description

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Cross-platform testing done

## Screenshots (if applicable)
Add screenshots for UI changes
```

## 🚫 What Not to Contribute

- Unnecessary dependencies
- Breaking changes without discussion
- Code that doesn't follow established patterns
- Features without proper error handling
- Untested code

## 📞 Getting Help

- Open an issue for bugs or feature requests
- Join discussions in existing issues
- Reach out to maintainers for guidance

## 🎯 Priority Areas

We especially welcome contributions in:
- iOS platform support
- Performance optimizations
- Accessibility improvements
- UI/UX enhancements
- Test coverage improvements

Thank you for contributing to EduPay Mobile! 🎉
