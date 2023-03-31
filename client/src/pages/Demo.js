import { Tabs } from "@mantine/core";
import {
	IconPhoto,
	IconMessageCircle,
	IconSettings,
} from "@tabler/icons-react";

import { Spoiler } from "@mantine/core";

export default function Demo() {
	return (
		<Tabs orientation="horizontal" defaultValue="gallery">
			<Tabs.List>
				<Tabs.Tab value="gallery" icon={<IconPhoto size="0.8rem" />}>
					Gallery
				</Tabs.Tab>
				<Tabs.Tab
					value="messages"
					icon={<IconMessageCircle size="0.8rem" />}>
					Messages
				</Tabs.Tab>
				<Tabs.Tab
					value="settings"
					icon={<IconSettings size="0.8rem" />}>
					Settings
				</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value="gallery" pl="xs">
				<Spoiler maxHeight={40} showLabel="Show more" hideLabel="Hide">
					We Butter the Bread with Butter was founded in 2007 by
					Marcel Neumann, who was originally guitarist for Martin
					Kesici's band, and Tobias Schultka. The band was originally
					meant as a joke, but progressed into being a more serious
					musical duo. The name for the band has no particular
					meaning, although its origins were suggested from when the
					two original members were driving in a car operated by
					Marcel Neumann and an accident almost occurred. Neumann
					found Schultka "so funny that he briefly lost control of the
					vehicle." Many of their songs from this point were covers of
					German folk tales and nursery rhymes.
				</Spoiler>
			</Tabs.Panel>

			<Tabs.Panel value="messages" pl="xs">
				Messages tab content
			</Tabs.Panel>

			<Tabs.Panel value="settings" pl="xs">
				Settings tab content
			</Tabs.Panel>
		</Tabs>
	);
}
