export const PRODUCT_CATEGORIES = [
	{
		label: "UI Kits",
		value: "ui_kits" as const,
		featured: [
			{
				name: "Editor picks",
				href: "#",
				imagesSrc: "/nav/ui-kits/mixed.jpg"
			},
			{
				name: "New Arrivals",
				href: "#",
				imagesSrc: "/nav/ui-kits/blue.jpg"
			},
			{
				name: "Bestsellers",
				href: "#",
				imagesSrc: "/nav/ui-kits/purple.jpg"
			}
		]
	},
	{
		label: "Icons",
		value: "icons" as const,
		featured: [
			{
				name: "Favorite Icon Picks",
				href: "#",
				imagesSrc: "/nav/icons/picks.jpg"
			},
			{
				name: "New Arrivals",
				href: "#",
				imagesSrc: "/nav/icons/new.jpg"
			},
			{
				name: "Editor picks",
				href: "#",
				imagesSrc: "/nav/icons/bestsellers.jpg"
			}
		]
	}
];
