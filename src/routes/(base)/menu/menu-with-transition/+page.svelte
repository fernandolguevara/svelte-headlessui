<script lang="ts">
  import {Menu, MenuButton, MenuItem, MenuItems, Transition} from '$lib'

  function classNames(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(' ')
  }
  function resolveClass({active, disabled}: {active: boolean; disabled: boolean}) {
    return classNames(
      'flex justify-between w-full px-4 py-2 text-sm leading-5 text-left',
      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
      disabled && 'cursor-not-allowed opacity-50'
    )
  }
</script>

<div class="flex justify-center w-screen h-full p-12 bg-gray-50">
  <div class="relative inline-block text-left">
    <Menu>
      <span class="rounded-md shadow-sm">
        <MenuButton
          class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
        >
          <span>Options</span>
          <svg class="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </MenuButton>
      </span>

      <Transition
        enter="transition duration-1000 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-1000 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
        >
          <div class="px-4 py-3">
            <p class="text-sm leading-5">Signed in as</p>
            <p class="text-sm font-medium leading-5 text-gray-900 truncate">tom@example.com</p>
          </div>

          <div class="py-1">
            <MenuItem as="a" href="#account-settings" class={resolveClass}>
              Account settings
            </MenuItem>
            <MenuItem as="a" href="#support" class={resolveClass}>Support</MenuItem>
            <MenuItem as="a" disabled href="#new-feature" class={resolveClass}>
              New feature (soon)
            </MenuItem>
            <MenuItem as="a" href="#license" class={resolveClass}>License</MenuItem>
          </div>

          <div class="py-1">
            <MenuItem as="a" href="#sign-out" class={resolveClass}>Sign out</MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  </div>
</div>
