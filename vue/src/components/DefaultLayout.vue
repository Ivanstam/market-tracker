<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useRouter} from 'vue-router'

const store = useStore();
const router = useRouter();
const user = sessionStorage.getItem('USER_NAME')

function logout(){
  store.dispatch('logout')
    .then(() => {
      router.push({
        name: 'Login'
      })
    });
}

// TODO: implement this in a more reasonable place, not hardcoded.
const navigation = [
  { name: 'Dashboard', to: {name: 'Dashboard'}},
  { name: 'Stocks', to: {name: 'Stocks'}},
  { name: 'Exchanges', to: {name: 'ExchangeList'}},
  { name: 'Portfolio', to: {name: 'Portfolio'}}
]
</script>

<template>
  <div class="min-h-full text-gray-200">
    <Disclosure as="nav" class="bg-slate-900 text-white" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="h-8 w-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
            </div>
            <div class="hidden sm:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link v-for="item in navigation" :key="item.name" :to="item.to" active-class="bg-gray-900 text-white"
                :class="[this.$route.name === item.to.name ?
                'bg-gray-600' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium']">{{ item.name }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="hidden sm:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none
                  focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" alt="" />
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-700 py-1
                  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-slot="{ active }">
                      <a @click='logout' :class="['block px-4 py-2 text-sm cursor-pointer']">Log out</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex sm:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton class="inline-flex items-center justify-center rounded-md bg-gray-800 p-2
            text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2
            focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <router-link v-for="item in navigation" :key="item.name" as="a"
                       :to="item.to" active-class="bg-gray-900 text-white"
          :class="[this.$route.name !== item.to.name ? 'text-gray-300 hover:bg-gray-700 hover:text-white' :
          'bg-gray-600', 'block rounded-md px-3 py-2 text-base font-medium']" >
          {{ item.name }}</router-link>
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
          <div class="grid grid-cols-2 gap-3 space-y-1 px-2">
            <DisclosureButton as="a" @click='logout' class="block rounded-md px-3 py-2 text-base font-medium
             text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">Log out</DisclosureButton>
            <div class="font-bold py-1">{{ user }}</div>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <router-view></router-view>
  </div>
</template>
