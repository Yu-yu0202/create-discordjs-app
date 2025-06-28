# create-discordjs-app

A CLI tool to easily create Discord.js applications with interactive setup.

## 🚀 Features

- **Easy Setup**: Interactive CLI to create projects
- **TypeScript Support**: Support for both TypeScript and JavaScript
- **Multiple Package Managers**: Support for npm, yarn, pnpm, and bun
- **Git Initialization**: Optional automatic Git repository initialization
- **Secure**: Input validation and security measures implemented

## 📦 Installation

```bash
# npm
npx create-discordjs-app@latest

# yarn
yarn create discordjs-app

# pnpm
pnpm create discordjs-app

# bun
bunx create-discordjs-app
```

## 🎯 Usage

### Basic Usage

```bash
npx create-discordjs-app my-discord-bot
```

### Interactive Setup

```bash
npx create-discordjs-app
```

You can choose project name, TypeScript usage, Git initialization, and package manager.

## 🔧 Options

| Option | Description | Default |
|--------|-------------|---------|
| `--typescript` | Use TypeScript | `true` |
| `--git` | Initialize Git repository | `true` |

## 📁 Generated File Structure

```
my-discord-bot/
├── src/
│   ├── index.ts (or index.js)
│   └── commands/
├── package.json
├── tsconfig.json (when using TypeScript)
├── .env.example
└── README.md
```

## 🛡️ Security

This tool implements the following security measures:

- **Command Injection Protection**: Whitelist validation for package managers
- **Path Traversal Protection**: Input validation for project names
- **Type Safety**: TypeScript type checking
- **Error Handling**: Proper exception handling

## 🤝 Contributing

Pull requests and issue reports are welcome!

## 📄 License

This project is licensed under the [GPL-3.0-or-later](LICENSE) license.

## 🐛 Troubleshooting

### Common Issues

1. **Permission Error**
   ```bash
   # Run with administrator privileges
   sudo npx create-discordjs-app my-bot
   ```

2. **Network Error**
   ```bash
   # Check proxy settings
   npm config set proxy http://your-proxy:port
   ```

3. **Dependency Installation Error**
   ```bash
   # Clear cache
   npm cache clean --force
   ```

## 📞 Support

If you encounter any issues, please report them on [GitHub Issues](https://github.com/Yu-yu0202/create-discordjs-app/issues). 