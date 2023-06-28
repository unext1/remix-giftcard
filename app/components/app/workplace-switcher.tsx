import { useNavigate, useParams } from '@remix-run/react';
import { ChevronsUpDown } from 'lucide-react';
import { useMemo } from 'react';

import { route } from 'routes-gen';
import { Button, FormInput } from '~/components/form';
import { ComboboxWithAction } from '~/components/ui/combobox';

export const WorkplaceSwitcher = ({
  workplaces,
  memberOfWorkplaces
}: {
  workplaces: { id: string; title: string }[];
  memberOfWorkplaces: { id: string; title: string }[];
}) => {
  const params = useParams();
  const navigate = useNavigate();

  const groupedItems = useMemo(
    () => [
      {
        title: 'Owner',
        items: workplaces.map((item) => ({
          label: item.title,
          value: item.id,
          onSelect: () => navigate(route('/app/:workplaceId', { workplaceId: item.id }))
        }))
      },
      {
        title: 'Member',
        items: memberOfWorkplaces.map((item) => ({
          label: item.title,
          value: item.id,
          onSelect: () => navigate(route('/app/:workplaceId', { workplaceId: item.id }))
        }))
      }
    ],
    [workplaces, memberOfWorkplaces, navigate]
  );

  const selectedWorkplace = useMemo(
    () =>
      groupedItems
        .map((group) => group.items)
        .flat()
        .find((item) => item.value === params.workplaceId),
    [groupedItems, params.workplaceId]
  );

  return (
    <ComboboxWithAction
      key={params.workplaceId}
      combobox={{
        groupedItems,
        selectedItem: selectedWorkplace,
        buttonTrigger: (item, open) => {
          return (
            <Button
              className="btn-sm btn-primary w-full px-2"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a Workplace"
            >
              {/* <Avatar className="h-8 w-8" name={item?.label || ''} /> */}
              <span className="truncate flex-1 text-left">{item?.label || 'Select a Workplace'}</span>
              <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          );
        }
      }}
      dialog={{
        title: 'Create a Workplace'
      }}
      form={{
        action: route('/new/workplace'),
        method: 'post'
      }}
    >
      <FormInput name="name" placeholder="Workplace Name" className="bg-neutral" labelTop="Workplace Name" required />
    </ComboboxWithAction>
  );
};
