import { useNavStoreWithOut } from '@/store/modules/nav'

const navStore = useNavStoreWithOut()

export function setTitle(title: string) {
  navStore.setNavbar(title)
}
export function getTitle() {
  return navStore.navbarInfo.title
}   