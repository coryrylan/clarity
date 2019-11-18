# cwc-modal

Modal

## Attributes

| Attribute | Type     | Description                                      |
|-----------|----------|--------------------------------------------------|
| `size`    | `string` | Sets max width of the modal (`default`, `sm`, `lg`, `xl`) |

## Properties

| Property           | Attribute          | Type      | Default | Description                                      |
|--------------------|--------------------|-----------|---------|--------------------------------------------------|
| `backdropClosable` | `backdropClosable` | `boolean` | false   | Option to set if modal can be closed by clicking the modal backdrop |
| `closable`         | `closable`         | `boolean` | true    | Option to set if modal can be closed by clicking the X or backdrop |
| `open`             | `open`             | `boolean` |         | Toggle if modal should be open or closed.        |

## Events

| Event        | Description                                      |
|--------------|--------------------------------------------------|
| `openChange` | Notify when the modal has been opened or closed. |

## Slots

| Name                | Description                    |
|---------------------|--------------------------------|
| `cwc-modal-actions` | Content slot for modal actions |
| `cwc-modal-content` | Content slot for modal content |
| `cwc-modal-header`  | Content slot for modal header  |
