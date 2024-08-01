import { InputField, TextAreaField } from '@/components/inputs'
import React from 'react'
import dayjs from 'dayjs'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { ConnectedReportSummary } from './summaries'
  
export type Report = {
    id: string,
    statusType: string,
    submittedType: string,
    incidentType: string,
    location: string,
    date: Date,
    details: string,
    connectedReports: Report[]
}

type StatusConfiguration = {
    dialogTitle: string;
    dialogDescription: string;
    ctaButtonText: string;
    buttonTWClasses: string;
};

const reportStatusState = (statusType: string): StatusConfiguration | null => {

    const statusConfigurations: { [key: string]: StatusConfiguration } = {
        unclaimed: {
            dialogTitle: 'Would you like to claim this report?',
            dialogDescription: 'Claiming this report will make it attached t you as a Safe Path Monitor and you will be responsible for resolving it.',
            ctaButtonText: 'Claim Report',
            buttonTWClasses: 'bg-primary text-white'
        },
        'in progress': {
            dialogTitle: 'Would you like to close this report?',
            dialogDescription: 'This report will be submitted for view and marked as closed.',
            ctaButtonText: 'Close Report',
            buttonTWClasses: 'bg-secondary text-black'
        }
    };

    return statusConfigurations[statusType] || null;
}

export default async function ReportView({ report } : { report: Report }) {
    const { 
        statusType, 
        submittedType, 
        incidentType, 
        location, 
        date, 
        details, 
        connectedReports
    } : Report = report;

    const { dialogTitle, dialogDescription, ctaButtonText, buttonTWClasses } = reportStatusState(statusType) || {};

    const buttonBaseClasses = 'uppercase border-accent rounded-2xl px-6 py-2 shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15),0px_1px_3px_0px_rgba(0,0,0,0.30)] w-full text-center'

    return (
        <>
            <form className='relative w-full flex flex-col gap-y-4 min-h-full'>
                {/* Overview: Status, Submitted By, Incident Type */}
                <div className='overview w-full'>
                    <h3 className='font-semibold text-base text-primary mb-2'>
                        Overview
                    </h3>
                    <div className='w-full gap-y-4 flex flex-col'>
                        <div className='flex flex-row w-full gap-x-2 justify-between'>
                            <InputField 
                            name="status-type" 
                            placeholder="" 
                            icon={submittedType === 'text-in' ? '/icons/textsms.svg' : '/icons/SPM_shield.svg'}
                            label="Status Type" 
                            value={statusType}
                            readOnly={true} 
                            width='1/2'
                             />
                            <InputField name='submitted-type' 
                            placeholder='' 
                            label='Submitted Type' 
                            value={submittedType} 
                            icon="/icons/textsms.svg"
                            disabled={true}
                            readOnly={true} 
                            width="1/2" />
                        </div>
                        <InputField name='incident-type'
                        placeholder=''
                        label='Incident Type'
                        value={incidentType}
                        readOnly={true}
                        icon='/icons/flag.svg' />
                    </div>
                </div>
                {/* Incident Details: Location, Date-Time, Details */}
                <div className='incident-details w-full'>
                    <h3 className='font-semibold text-base text-primary mb-2'>Details</h3>
                    <div className='w-full gap-y-4 flex flex-col'>
                        <InputField name='location'
                            placeholder=''
                            label='Location'
                            value={location}
                            readOnly={true}
                            width='full'
                            icon='/icons/location.svg' />
                        <div className='flex flex-row w-full gap-x-2'>
                            <InputField name='date' 
                            placeholder=''
                            label='Date'
                            icon='/icons/calendar.svg'
                            value={dayjs(date).format('MM/DD/YYYY')}
                            width='1/2'
                            />
                            <InputField name='time'
                            placeholder=''
                            label='Time'
                            icon='/icons/clock.svg'
                            value={dayjs(date).format('hh:mm A')} 
                            width='1/2' />
                        </div>
                        <TextAreaField name='details' 
                        placeholder=''
                        label='Details'
                        value={details}
                        icon='/icons/description.svg'
                        readOnly={true}
                        disabled={statusType === 'in progress' ? false : true}
                        />
                    </div>
                    {(statusType === 'closed' && connectedReports) && (
                        <>
                            <h3 className='font-semibold text-base text-primary mb-2'>Connected Reports</h3>
                            {connectedReports.map((report) => (
                                <ConnectedReportSummary key={report.id} id={report.id} />
                            ))}
                        </>
                    )}

                </div>
                <div className='fixed p-8 left-0 bottom-0 w-full flex flex-col items-center justify-center'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className={buttonTWClasses + " " + buttonBaseClasses}>
                                {ctaButtonText}
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>{dialogTitle}</DialogTitle>
                            <DialogDescription>
                                {dialogDescription}
                            </DialogDescription>
                            <div className='fle flex-row justify-end'>
                                <div className='flex flex-row gap-x-4 h-'>
                                    <DialogClose asChild>
                                        <button className='text-primary font-medium'>No</button>
                                    </DialogClose>
                                    <button className='text-primary font-medium'>Yes</button>
                                </div>
                            </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </form>
        </>
    )
}