'use client';

import "@clayui/css/lib/css/atlas.css";
import ClayLayout from "@clayui/layout";
import ClayIcon from '@clayui/icon';
import ClayButton from '@clayui/button';
import Search from '../app/ui/search';
export default function Home() {

    return (
        <>
            {/* Header */}
            <ClayLayout.ContainerFluid className="mt-4">
                <ClayLayout.ContentRow className="align-items-center">
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
            </ClayLayout.ContainerFluid>

            {/* Content */}
            <ClayLayout.ContainerFluid className="align-item-center mt-10" size="lg">
                <ClayLayout.ContentRow className="justify-content-center">
                    <ClayLayout.ContentCol className="text-center">
                        <p className="text-11 text-black mb-3">RecipeHub</p>
                        <p className="text-black mb-4">Welcome to RecipeHub! Explore recipes, create your own, and share with the world.</p>
                        <Search/>
                    </ClayLayout.ContentCol>
                </ClayLayout.ContentRow>
            </ClayLayout.ContainerFluid>
        </>
    );
}
