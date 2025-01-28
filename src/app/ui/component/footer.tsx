import ClayLayout from '@clayui/layout';

export default function Footer() {
    return (
        <footer
            className="bg-light border-top p-4 m-0"
        >
            <ClayLayout.ContentRow className="justify-content-between align-items-center">
                <ClayLayout.ContentCol>
                    <p className="mb-0 text-muted">
                        © {new Date().getFullYear()} RecipeHub. All Rights Reserved.
                    </p>
                    <p className="mb-0 text-muted">

                    </p>
                </ClayLayout.ContentCol>

                <ClayLayout.ContentCol className="text-end">
                    <a href="/terms" className="text-muted me-3">
                        Terms of Service
                    </a>
                    <a href="/privacy" className="text-muted">
                        Privacy Policy
                    </a>
                </ClayLayout.ContentCol>
            </ClayLayout.ContentRow>
        </footer>
    );
}