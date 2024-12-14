'use client';

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import useRentModal from "@/app/hooks/useRental";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import Modal from "./Modal";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    IMAGES = 2,  // Fixed duplicate enum value
    DESCRIPTION = 3,
    PRICE = 4,
    CONTACT = 5
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            imageSrc: '',
            price: 1, 
            title: '',
            description: '',
            contactPhone: '',
            contactEmail: '',
            address:'',
        }
    });

    const category = watch('category');
    const imageSrc = watch('imageSrc');

    const setCustomValue = (id: string, value: string) => {  // Updated value type to 'string'
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const onBack = () => setStep((value) => value - 1);
    const onNext = () => setStep((value) => value + 1);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step === STEPS.CONTACT) {
            setIsLoading(true);
            axios.post('/api/listings', data)
                .then(() => {
                    toast.success('Listing created');
                    router.refresh();
                    reset();
                    setStep(STEPS.CATEGORY);
                    rentModal.onClose();
                })
                .catch(() => {
                    toast.error('Something went wrong');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            onNext();
        }
    };

    const actionLabel = useMemo(() => {
        return step === STEPS.CONTACT ? 'Create' : 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        return step === STEPS.CATEGORY ? undefined : 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Which of these best describes your property?" subtitle="Pick a category" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Add pictures" />
                <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
            </div>
        );
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="How would you describe it?" subtitle="Short and sweet works best!" />
                <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />
                <hr />
                <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
            </div>
        );
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Now, set your price" subtitle="How much do you charge?" />
                <Input id="price" label="Price" formatPrice type="number" disabled={isLoading} register={register} errors={errors} required />
            </div>
        );
    }

    if (step === STEPS.CONTACT) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Contact Details" subtitle="Provide your contact information" />
                <Input id="contactPhone" label="Phone Number" disabled={isLoading} register={register} errors={errors} required />
                <hr />
                <Input id="contactEmail" label="Email Address" disabled={isLoading} register={register} errors={errors} required />
                <hr />
                <Input id="address" label="Address" disabled={isLoading} register={register} errors={errors} required />
            </div>
        );
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            title="Get your property listed"
            body={bodyContent}
        />
    );
};

export default RentModal;
