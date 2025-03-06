import { useState, useEffect } from "react";
import { Device } from "../keys/device";

const useDevice = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    
    const getDeviceType = (width:number) => {
        if (width >= 280 && width <= 450) {
            return Device.MOBILE;
        } else if (width > 450 && width <= 1024) {
            return Device.TABLET;
        } else {
            return Device.DESKTOP;
        }
    };

    const [deviceType, setDeviceType] = useState(getDeviceType(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWindowDimensions({
                width: width,
                height: window.innerHeight,
            });
            setDeviceType(getDeviceType(width));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { windowDimensions, deviceType, getDeviceType };
}

export default useDevice;
