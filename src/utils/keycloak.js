export default function initKeycloak() {
    const script = document.createElement("script");

    script.src = process.env.REACT_APP_ADAPTER_URL;

    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
        const keycloak = new window.Keycloak("/keycloak.json");
        keycloak.init({ onLoad: "login-required" }).then((authenticated) => {});
    };
    return () => {
        document.body.removeChild(script);
    };
}
