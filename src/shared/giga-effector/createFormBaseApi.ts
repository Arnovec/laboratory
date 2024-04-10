import { createEvent, createStore } from 'effector';

export function createFormBaseApi<Template extends Record<string, string | number>>(template: Template) {
  const valueChanged = createEvent<{ key: keyof Template; value: Template[keyof Template] }>();
  const formChanged = createEvent<Partial<Template>>();
  const reset = createEvent();

  const $form = createStore(template)
    .on(valueChanged, (form, payload) => {
      if (form[payload.key] !== payload.value) {
        return {
          ...form,
          [payload.key]: payload.value,
        };
      }

      return form;
    })
    .on(formChanged, (form, updatedForm) => ({ ...form, ...updatedForm }))
    .reset(reset);

  return {
    valueChanged,
    formChanged,
    reset,
    $form,
  };
}
