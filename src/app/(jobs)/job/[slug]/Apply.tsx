'use client';
import ApplyModal from '@/app/(jobs)/job/[slug]/ApplyModal';

import { useState, createContext } from 'react';
import { Button } from '@/components/landing/Button';
import { ExistingJob, ApplyType, ExistingDeveloper } from '@/utils/types';

export const ApplyContext = createContext(false);


const makeApplyRequest = async (apply: ApplyType) => {
  const res = await fetch('/api/apply', {
    method: 'POST',
    body: JSON.stringify(apply),
  });
  console.log(res);

};

export const SelectDevContext = createContext(function(
  _dev: ExistingDeveloper,
  _rate: string,
) {
});

export default function Apply({ job }: {
  job: ExistingJob
}) {
  const [open, setOpen] = useState(false);

  const selectDev = (dev: ExistingDeveloper, rate: string): void => {
    const apply: ApplyType = {
      developer: dev.id,
      job: job.id,
      rate: rate,
      poster: job.company,
      provider: dev.company,
    };
    makeApplyRequest(apply);
    setOpen(false);
  };

  return (
    <ApplyContext.Provider value={true}>
      <SelectDevContext.Provider value={selectDev}>
        <>
          <Button
            color='blue'
            loading={false}
            className=''
            variant='solid'
            onClick={() => setOpen(true)}
          >
            Select developers to apply
          </Button>

          <ApplyModal open={open} close={() => setOpen(false)}></ApplyModal>
        </>
      </SelectDevContext.Provider>
    </ApplyContext.Provider>
  );
}
