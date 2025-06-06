# AuraSphere

AuraSphere is a modern, modular React-based social media application inspired by Instagram, designed to provide a digital aura space for users to share images, videos, stories, moods, and messages. The project aims for an aesthetic, highly responsive UI/UX, and a scalable architecture with a rich feature set.

## Current State

AuraSphere contains foundational implementation for core UI scaffolding, page routing, navigation (navbar and sidebar), and architectural stubs for advanced features like theming, authentication, notifications, and media upload. Each main feature or page exists as a stub component, organized for clear extensibility.

## Folder Structure

The application source is in `aura_sphere/` with this high-level structure:

```
aura_sphere/
  README.md
  src/
    App.js                # Main app container and router
    components/
      Navbar.js           # Top navigation bar (responsive)
      Sidebar.js          # Sidebar navigation (desktop)
    context/
      ThemeContext.js     # Theme (dark/light) context stub
    features/
      Feed/               # Feed page stub
      Explore/            # Explore page stub
      Profile/            # Profile page stub
      Stories/            # Stories page stub
      Messaging/          # Direct messaging page stub
      Admin/              # Admin dashboard stub
      Auth/               # Authentication context & stub page
      MediaUpload/        # Media upload context & stub page
      Notifications/      # Notifications context & stub page
    ...
```

See [ARCHITECTURE.md](kavia-docs/ARCHITECTURE.md) for a detailed breakdown of all folders, code structure, and architecture.

## Navigation and Routing

AuraSphere uses React Router for page navigation, with a main navbar (top, responsive), and a sidebar (desktop only). Routes are defined in `src/App.js`, and map to stub page components for Feed, Explore, Profile, Stories, Messaging, Media Upload, Notifications, Admin, and Auth. Both navigation components are isolated for maintainability and responsive design.

## Foundation for Expansion

The codebase includes context providers as **stubs** for theming, authentication, notifications, and media uploads. These are ready to accept real logic and further state management as implementation continues. All main features are represented as folders and empty page components within `features/` for further development.

## Next Steps and Recommendations

- Integrate real authentication logic in `AuthContext.js` and the Auth page (suggested: Firebase Auth or Auth0).
- Implement real notification queueing, delivery, and UX via `NotificationsContext.js`.
- Connect media upload logic in `MediaUploadContext.js` (e.g., Firebase Storage or Cloudinary).
- Expand each feature folder's `Page.js` into full UI/UX based on requirements (see ARCHITECTURE.md).
- Implement real theming and theme toggle logic in `ThemeContext.js` and propagate to the application.
- Add state management (context or external, e.g., Redux) as need grows.

For a technical deep-dive, consult [kavia-docs/ARCHITECTURE.md](kavia-docs/ARCHITECTURE.md).
