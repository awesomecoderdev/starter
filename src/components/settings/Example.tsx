"use client";
import { classNames } from "@/utils/class";
/*
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import {
	ArrowLeftOnRectangleIcon,
	Bars3BottomLeftIcon,
	BellIcon,
	BriefcaseIcon,
	ChatBubbleOvalLeftEllipsisIcon,
	CogIcon,
	DocumentMagnifyingGlassIcon,
	HomeIcon,
	QuestionMarkCircleIcon,
	UsersIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const navigation = [
	{ name: "Home", href: "#", icon: HomeIcon, current: false },
	{ name: "Jobs", href: "#", icon: BriefcaseIcon, current: false },
	{
		name: "Applications",
		href: "#",
		icon: DocumentMagnifyingGlassIcon,
		current: false,
	},
	{
		name: "Messages",
		href: "#",
		icon: ChatBubbleOvalLeftEllipsisIcon,
		current: false,
	},
	{ name: "Team", href: "#", icon: UsersIcon, current: false },
	{ name: "Settings", href: "#", icon: CogIcon, current: true },
];
const secondaryNavigation = [
	{ name: "Help", href: "#", icon: QuestionMarkCircleIcon },
	{ name: "Logout", href: "#", icon: ArrowLeftOnRectangleIcon },
];
const tabs = [
	{ name: "General", href: "#", current: true },
	{ name: "Password", href: "#", current: false },
	{ name: "Notifications", href: "#", current: false },
	{ name: "Plan", href: "#", current: false },
	{ name: "Billing", href: "#", current: false },
	{ name: "Team Members", href: "#", current: false },
];

export default function Example() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
		useState(true);
	const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
		useState(false);

	return (
		<div className="mt-10 divide-y divide-gray-200">
			<div className="mt-6">
				<dl className="divide-y divide-gray-200">
					<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
						<dt className="text-sm font-medium text-gray-500">
							Name
						</dt>
						<dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							<span className="flex-grow">Chelsea Hagon</span>
							<span className="ml-4 flex-shrink-0">
								<Link
									href="/settings/profile"
									className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
								>
									Update
								</Link>
							</span>
						</dd>
					</div>
					<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
						<dt className="text-sm font-medium text-gray-500">
							Photo
						</dt>
						<dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							<span className="flex-grow">
								<img
									className="h-8 w-8 rounded-full"
									src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt=""
								/>
							</span>
							<span className="ml-4 flex flex-shrink-0 items-start space-x-4">
								<Link
									href="/settings/profile"
									className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
								>
									Update
								</Link>
							</span>
						</dd>
					</div>
					<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
						<dt className="text-sm font-medium text-gray-500">
							Email
						</dt>
						<dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							<span className="flex-grow">
								chelsea.hagon@example.com
							</span>
							<span className="ml-4 flex-shrink-0">
								<Link
									href="/settings/profile"
									className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
								>
									Update
								</Link>
							</span>
						</dd>
					</div>
					<div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
						<dt className="text-sm font-medium text-gray-500">
							Job title
						</dt>
						<dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							<span className="flex-grow">
								Human Resources Manager
							</span>
							<span className="ml-4 flex-shrink-0">
								<Link
									href="/settings/profile"
									className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
								>
									Update
								</Link>
							</span>
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}
