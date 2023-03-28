import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import QuestionModalContent from "./QuestionModalContent";

function QuestionModal(props) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				withCloseButton={false}
				size="80%"
				xOffset='3vh'
				align="middle">
				<QuestionModalContent />
			</Modal>

			<Button onClick={open}>Add a new Question</Button>
		</>
	);
}

export default QuestionModal;
