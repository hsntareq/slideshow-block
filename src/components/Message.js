/**
 * Message Component
 *
 * Displays messages with different types (success, error, warning)
 *
 * @param {Object} props
 * @param {string} props.type - Type of message: 'success', 'error', 'warning'
 * @param {string} props.message - The message text to display
 * @param {function} props.onClose - Callback function when close button is clicked
 * @return {Element} Message element or null
 */
export default function Message({ type = 'success', message = '', onClose = null }) {
	if (!message) return null;

	const getColorByType = () => {
		switch (type) {
			case 'error':
				return 'red';
			case 'warning':
				return 'orange';
			case 'success':
				return 'green';
			default:
				return 'blue';
		}
	};

	return (
		<div className={`lds_message ${getColorByType()}`}>
			<span>{message}</span>
			{onClose && (
				<button className='ide_button' onClick={onClose}>
					✕
				</button>
			)}
		</div>
	);
}
