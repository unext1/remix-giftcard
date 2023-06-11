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
  workplaces: { id: string; name: string }[];
  memberOfWorkplaces: { id: string; name: string }[];
}) => {
  const params = useParams();
  const navigate = useNavigate();

  const groupedItems = useMemo(
    () => [
      {
        title: 'Owner',
        items: workplaces.map((item) => ({
          label: item.name,
          value: item.id,
          onSelect: () => navigate(route('/:workplaceId', { workplaceId: item.id }))
        }))
      },
      {
        title: 'Member',
        items: memberOfWorkplaces.map((item) => ({
          label: item.name,
          value: item.id,
          onSelect: () => navigate(route('/:workplaceId', { workplaceId: item.id }))
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
        title: 'Create a Workplace',
        description:
          'This will create a new workplace and add you as the owner. You can invite others to join your workplace later.'
      }}
      form={{
        action: route('/new/workplace'),
        method: 'post'
      }}
    >
      <FormInput name="name" placeholder="Workplace Name" labelTop="Workplace Name" required />
    </ComboboxWithAction>
  );
};
