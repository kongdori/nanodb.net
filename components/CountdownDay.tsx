import Countdown, { zeroPad, CountdownProps } from 'react-countdown';

const CountdownDay = ({ ...props }: CountdownProps) => (
    <Countdown
        {...props}
        renderer={({ days, hours, minutes, seconds, completed }) => {
            if (completed) return null;

            return (
                <span suppressHydrationWarning>
                    {days > 0 && `${days}일 `}
                    {`${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(
                        seconds
                    )}`}
                </span>
            );
        }}
    />
);

export default CountdownDay;
