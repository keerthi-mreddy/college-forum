import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Anchor } from "@mantine/core";
import { Content } from "./Content";

function CustomModal(props) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal opened={opened} onClose={close} withCloseButton={false}>
				<Content
					title={props.item.title}
					given_by={props.item.given_by}
					desc={props.item.description}
					date = {props.item.date.toDateString()}
				/>
			</Modal>

			<Group>
				<Anchor onClick={open}>{props.item.title}</Anchor>
			</Group>
		</>
	);
}

export default CustomModal;
