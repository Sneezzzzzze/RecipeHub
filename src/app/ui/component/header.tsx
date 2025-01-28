import ClayLayout from "@clayui/layout";
import ClayButton from "@clayui/button";
import ClayIcon from "@clayui/icon";

export default function Header() {
    return(
        <>
            <header className="sticky-top px-5 pt-3">
                <ClayLayout.ContentRow className="align-items-center justify-between">
                    <ClayLayout.ContentCol>
                        <p className="text-5 text-black mb-1 font-weight-semi-bold">RecipeHub</p>
                    </ClayLayout.ContentCol>
                    <ClayLayout.ContentCol className="ml-auto">
                        <ClayLayout.ContentRow>
                            <ClayLayout.ContentCol>
                                <ClayButton.Group spaced>
                                    <ClayButton borderless displayType="secondary" className="text-black">
                                        Item 1
                                    </ClayButton>
                                    <ClayButton borderless displayType="secondary">
                                        Item 2
                                    </ClayButton>
                                    <ClayButton borderless displayType="secondary">
                                        Item 3
                                    </ClayButton>
                                    <ClayButton borderless displayType="secondary" aria-label="User">
                                        <ClayIcon
                                            symbol="user"
                                            spritemap="/images/icons.svg"
                                            style={{ fontSize: '24px', width: '24px', height: '24px' }}
                                        />
                                    </ClayButton>
                                </ClayButton.Group>
                            </ClayLayout.ContentCol>
                        </ClayLayout.ContentRow>
                    </ClayLayout.ContentCol>
                </ClayLayout.ContentRow>
            </header>
        </>
    );
}
