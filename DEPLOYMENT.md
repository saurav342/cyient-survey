# Deployment Guide

## Netlify Deployment

The project is configured for easy deployment on Netlify with the following setup:

### Files Added for Netlify

1. **`netlify.toml`** - Netlify configuration file
2. **`jsconfig.json`** - Path mapping configuration for imports

### Build Configuration

- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Node Version**: 18
- **Plugin**: `@netlify/plugin-nextjs`

### Deployment Steps

1. **Connect Repository**: Connect your GitHub repository to Netlify
2. **Build Settings**: Netlify will automatically detect the settings from `netlify.toml`
3. **Deploy**: The build will run automatically on every push to main branch

### Environment Variables (Optional)

If you need to configure environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-domain.netlify.app
NEXT_PUBLIC_APP_NAME=Cyient Feedback Platform
```

### Build Output

The build generates:
- Static pages for the main survey selector
- API routes for survey functionality
- Optimized JavaScript bundles
- Static assets

### Troubleshooting

If you encounter build issues:

1. **Check Node Version**: Ensure Node.js 18+ is used
2. **Clear Cache**: Clear Netlify build cache if needed
3. **Check Dependencies**: Ensure all dependencies are properly installed
4. **Path Issues**: Verify `jsconfig.json` is present for path mapping

### Build Success Indicators

✅ Build command completes without errors  
✅ All API routes are generated  
✅ Static pages are created  
✅ No module resolution errors  

The application should be accessible at your Netlify domain after successful deployment.
