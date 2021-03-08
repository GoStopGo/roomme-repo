# RoomMe

## Demo
https://codesandbox.io/s/github/GoStopGo/roomme-repo/tree/master


## Component

---------------
### Button

```html
<me-button></me-button>
```

#### Properties
| Name | Type | Default | Value | Description |
| - | - | - | - | - |
| color | String | `red` | `red` `green` `blue` | change button color |
| disabled | Boolean | false |  | disable button |

#### Event
| Action Name  | Execution |
| - | - |
| @click | when button is clicked |

---------------
### Description
```html
<me-description></me-description>
```

#### Properties
| Name | Type | Default | Value | Description |
| - | - | - | - | - |
| category | String |  |  | category tag |
| name | String |  |  | title text |
| address | String |  |  | address text |
| desc | String |  |  | description text |

---------------
### Dropdown

```html
<me-dropdown v-model="currentSelected" label="Label">
  <template #prefix>
    <me-icon />
  </template>
    <me-dropdown-list
      v-for="(obj, value) in list"
      :key="value"
      :label="obj.label"
      :value="value"
      @select="handleSelection"/>
</me-dropdown>
```

#### Properties
| Name | Type | Default | Value | Description |
| - | - | - | - | - |
| v-model / value | [Number, String] |  |  | data binding |
| label | String |  |  |  label |

#### Event
| Action Name  | Execution |
| - | - |
| @input | when data change |

#### Slot
| Slot Name  | Description |
| - | - |
| @prefix | for prefix icon |
| @default | for dropdown list |

---------------
### Dropdown List

```html
<me-dropdown-list
  v-for="(obj, value) in list"
  :key="value"
  :label="obj.label"
  :value="value"
  @select="handleSelection"
></me-dropdown-list>
```

#### Properties
| Name | Type | Default | Value | Description |
| - | - | - | - | - |
| v-model / value | String |  |  | data binding |
| label | String |  |  |  label |

#### Event
| Action Name  | Execution |
| - | - |
| @select | when select data |

---------------
### Gallery

```html
<me-gallery></me-gallery>
```

#### Properties
| Name | Type | Default | Value | Description |
| - | - | - | - | - |
| images | Array |  | ['url1', 'url2'] | URL of images |
| layout | Number | 1 | 1 / 2 | change type of layout |

#### Event
| Action Name  | Execution |
| - | - |
| @see-more | when see more image clicked |

---------------
### Search Field

```html
<me-search-field
  v-model="query"
  has-result="false"
  @remote-method="getList"
>
  <me-dropdown-list
    v-for="l in list"
    :key="l.value"
    :label="l.label"
    :value="l.value"
    @select="handleSelection"
  />
</me-search-field>
```

#### Properties
| Name | Type | Default | Value | Description |
| - | - | - | - | - |
| v-model / value | String |  |  | data binding |
| placeholder | String | 'Cari' |  | placeholder text |
| label | String | 'Search' |  | label text |
| has-result | Boolean | false |  | to show/hide result |

#### Event
| Action Name  | Execution |
| - | - |
| @input | when data value change |
| @remote-method | when data value change |

#### Slot
| Slot Name  | Description |
| - | - |
| @default | for search dropdown list |

---------------
### Input Field

```html
<me-input-field></me-input-field>
```

#### Properties
| Name | Type | Default | Value | Description |
| - | - | - | - | - |
| v-model / value | [Number, String] |  |  | data binding |
| placeholder | String |  |  | placeholder text |
| label | String |  |  | label text |
| disabled | Boolean |  |  | disable input |

#### Event
| Action Name  | Execution |
| - | - |
| @input | when data value change |
