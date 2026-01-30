import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const YearMonthPicker = ({
    startDate,
    handleDateChange,
    placeholderText,
}) => {
    
    return (
        <div className=''>
                <DatePicker
                    className="w-full monthYearPicker px-4 py-3"
                    placeholderText={placeholderText}
                    selected={startDate}
                    onChange={handleDateChange}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                />
        </div>
    )
}