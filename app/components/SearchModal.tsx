'use client';

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import useSearchModal from "../hooks/useSearchModal";
import Modal from "./modals/Modal";
import { DateRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios from 'axios';
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "./Heading";
import Input from "./inputs/Input";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });
  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();
  // Removed locationValue as it's not being used

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(
    async (data) => {
      if (step !== STEPS.DATE) {
        return onNext();
      }

      try {
        // Call API to search for location
        const response = await axios.get(`/api/query`, {
          params: { address: data.location }
        });

        if (response.status === 200) {
          const listing = response.data;
          let currentQuery = {};
          if (params) {
            currentQuery = qs.parse(params.toString());
          }

          // Defined type for updateQuery instead of any
          const updateQuery: { location?: string; startDate?: string; endDate?: string } = {
            ...currentQuery,
            location: listing?.address,
          };

          if (dateRange.startDate) {
            updateQuery.startDate = formatISO(dateRange.startDate);
          }
          if (dateRange.endDate) {
            updateQuery.endDate = formatISO(dateRange.endDate);
          }

          const url = qs.stringifyUrl({
            url: '/',
            query: updateQuery
          }, { skipNull: true });

          router.push(url);
          searchModal.onClose();
        }
      } catch (error) {
        setErrorMessage("Location not found");
        console.error("Error fetching location:", error); // Log the error for debugging
      }
    },
    [step, onNext, params, dateRange, router, searchModal]
  );

  const actionLabel = useMemo(() => (step === STEPS.DATE ? "Search" : "Next"), [step]);

  const bodyContent = (
    <div className="flex flex-col gap-8">
      {step === STEPS.LOCATION && (
        <>
          <Heading
            title="Where do you want to go?"
            subtitle="Find your ideal location!"
          />
          <Input 
            id="location" 
            label="Location" 
            placeholder="Enter a location"
            register={register} 
            errors={errors} 
            required
          />
        </>
      )}

      {step === STEPS.DATE && (
        <>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <DateRange
            ranges={[dateRange]}
            onChange={(ranges) => setDateRange(ranges.selection)}
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
            className="w-full"
          />
        </>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={step === STEPS.DATE ? "Back" : undefined}
      secondaryAction={step === STEPS.DATE ? onBack : undefined}
      body={bodyContent}
    />
  );
};

export default SearchModal;
