import { Menu } from './menu';

export const SIDEMENU: Menu[] = [
    {
        title: 'Home',
        url: '/home',
        submenu:[]
    },
    {
        title: 'History',
        url: '/history',
        submenu: []
    },
    {
        title: 'Settings',
        url: '/settings',
        submenu: [
            {
                title:'Location',
                url: '/settings/location',
                submenu:[]
            },
            {
                title:'Units',
                url: '/settings/units',
                submenu:[
                  {
                    title: 'Temperature',
                    url: '/settings/units/temp',
                    submenu: []
                  },
                  {
                    title: 'Pressure',
                    url: '/settings/units/pressure',
                    submenu: []
                  },

                ]
            }
        ]
    },
    {
        title: 'About',
        url: '/about',
        submenu: []
    }
];
