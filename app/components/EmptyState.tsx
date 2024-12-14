'use client';

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyState> = ({
    title = "No exact matches",
    subtitle = "Try changing or removing some of your filters",
    showReset
}) => {
    const router = useRouter();

    return (
        <div
            className="
                h-[60vh]
                flex
                flex-col
                gap-2
                justify-center
                items-center
                pt-10
            ">
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            {showReset && (
                <div className="w-48 mt-4">
                    <Button
                        outline
                        label="Remove all filters"
                        onClick={() => router.push('/')}
                    />
                </div>
            )}
        </div>
    );
};

export default EmptyState;
