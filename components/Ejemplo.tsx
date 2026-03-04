"use client";

function bufferToBase64URL(buffer: Uint8Array) {
    return btoa(String.fromCharCode(...buffer))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}

function base64URLToBuffer(base64url: string) {
    const base64 = base64url
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const binary = atob(base64);
    const buffer = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        buffer[i] = binary.charCodeAt(i);
    }

    return buffer;
}



const Ejemplo = () => {
    async function handleDemo() {
        try {
            // ⚠️ Challenge falso solo para demo
            const fakeChallenge = crypto.getRandomValues(new Uint8Array(32));

            const publicKey: PublicKeyCredentialRequestOptions = {
                challenge: fakeChallenge,
                rpId: window.location.hostname,
                userVerification: "preferred",
                timeout: 60000,
            };

            const credential = await navigator.credentials.get({
                publicKey,
            });

            console.log("Credential devuelta:", credential);
        } catch (err) {
            console.error("Error:", err);
        }
    }
    return (
        <div style={{ padding: "40px" }}>
            <h1>WebAuthn Demo (sin backend)</h1>
            <button onClick={handleDemo}>
                Probar Passkey
            </button>
        </div>
    );
}

export default Ejemplo