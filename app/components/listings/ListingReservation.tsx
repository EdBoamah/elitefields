'use client';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import Button from '../Button';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled = false,
    disabledDates
}) => {
    return (
        <div
            className="
            bg-white
            rounded-xl
            border-[1px]
            border-neutral-200
            overflow-hidden
            "
        >
            <div className="
                flex flex-row items-center gap-1 p-4
            ">
                <div className='text-2xl font-semibold'>
                    ${price}
                </div>
                
            </div>
            <hr />
            <DateRange
                ranges={[dateRange]}
                onChange={(item: RangeKeyDict) => onChangeDate(item.selection)}
                minDate={new Date()}
                disabledDates={disabledDates}
                rangeColors={['#262626']}
                direction="vertical"
                showDateDisplay={false}
            />
            <hr />
            <div className='p-4'>
                <Button
                    disabled={disabled}
                    label='Reserve'
                    onClick={onSubmit}
                />
            </div>
            <div
                className="
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-semibold
                text-lg
                "
            >
                <div>Total</div>
                <div>${totalPrice}</div>
            </div>
        </div>
    );
}

export default ListingReservation;
