import { createStyles, Card, Text, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	item: {
		"& + &": {
			paddingTop: theme.spacing.sm,
			marginTop: theme.spacing.sm,
			borderTop: `${rem(1)} solid ${
				theme.colorScheme === "dark"
					? theme.colors.dark[4]
					: theme.colors.gray[2]
			}`,
		},
	},

	switch: {
		"& *": {
			cursor: "pointer",
		},
	},

	title: {
		lineHeight: 1,
	},
}));

export function Content(props) {
	const { classes } = useStyles();
	return (
		<Card withBorder radius="md" p="xl" className={classes.card}>
			<Text fz="xl" className={classes.title} fw={500} underline>
				{props.title}
			</Text>
			<Text fz="md" mt={15} className={classes.title} fw={500}>
				{props.date}
			</Text>
			<Text c="dimmed" mt={15} mb="xl">
				{props.desc}
			</Text>
			<Text mb="xl" bold>
				- <i>{props.given_by}.</i>
			</Text>
		</Card>
	);
}
