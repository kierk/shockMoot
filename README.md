# ShockMoot - SwitchBot Remote Controller

A serverless web application for controlling SwitchBot devices with a dramatic activation sequence.

## Features

- 🔐 Secure input fields for Secret Key and Open Token with show/hide toggle
- ⚡ 5-second countdown animation before activation
- ⚡ 8-second electricity animation during shock initiation
- 🔌 Direct integration with SwitchBot API
- 📱 Responsive design for all devices
- 🎨 Modern, animated UI

## Setup Instructions

### 1. Get Your SwitchBot Credentials

1. Download the SwitchBot app on your mobile device
2. Go to Profile > Preferences > App Version
3. Tap the app version 10 times to enable Developer Options
4. Go to Profile > Developer Options
5. Generate your Open Token and Secret Key
6. Note your Device ID from the device list

### 2. Deploy to GitHub Pages

1. Fork or clone this repository
2. Push your code to GitHub
3. Go to your repository settings
4. Scroll down to "Pages" section
5. Select "Deploy from a branch"
6. Choose "main" branch and "/ (root)" folder
7. Click "Save"
8. Your app will be available at `https://yourusername.github.io/shockMoot`

### 3. Alternative: Deploy to Cloudflare Pages

1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Connect your GitHub account
4. Select your repository
5. Deploy with default settings
6. Your app will be available at your custom domain

## Usage

1. Open the deployed application
2. Enter your SwitchBot Secret Key (hidden by default)
3. Enter your SwitchBot Open Token (hidden by default)
4. Enter your Device ID
5. Click "Activate SwitchBot"
6. Watch the 5-second countdown
7. Enjoy the 8-second electricity animation
8. Your SwitchBot device will be activated!

## API Integration

This application uses the SwitchBot API v1.1 to send commands to your devices. The app:

- Generates proper HMAC-SHA256 signatures for authentication
- Sends a "press" command with "default" parameter
- Handles API responses and displays success/error messages

## Security Notes

- All credentials are handled client-side only
- No data is stored or transmitted to external servers
- The app uses modern cryptographic APIs for secure authentication
- Toggle visibility for sensitive fields to prevent shoulder surfing

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Troubleshooting

### Common Issues

1. **API Authentication Failed**: Double-check your Secret Key and Open Token
2. **Device Not Found**: Verify your Device ID is correct
3. **CORS Errors**: SwitchBot API doesn't allow direct browser requests. The app includes multiple CORS proxy fallbacks, but if you still encounter issues:

   **Solution 1: Browser Extension**
   - Install "CORS Unblock" or "CORS Everywhere" browser extension
   - Enable it for your domain
   - Refresh the page and try again

   **Solution 2: Alternative Proxies**
   - The app automatically tries multiple CORS proxies
   - If all fail, the error message will suggest using a browser extension

   **Solution 3: Local Development**
   - Run a local server: `python -m http.server 8000`
   - Access via `http://localhost:8000`
   - This bypasses some CORS restrictions

### Getting Help

- Check the [SwitchBot API Documentation](https://github.com/OpenWonderLabs/SwitchBotAPI)
- Verify your credentials in the SwitchBot app
- Ensure your device is online and connected

## License

MIT License - feel free to use and modify as needed.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**⚠️ Warning**: This application is for entertainment purposes. Use responsibly and ensure you have permission to control any devices.