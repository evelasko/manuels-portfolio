import React, { useEffect, useState, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import styled from "styled-components"

const LazyShowStyles = styled.section`
.lazy-div {
    /* height: 50vh; */
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    margin: 20px;
    padding: 20px;
    font-size: 1.5em;
    background: black!important;
}
`

const LazyShow = ({ children }) => {
    const controls = useAnimation()
    const rootRef = useRef()
    const onScreen = useOnScreen(rootRef)

    useEffect(() => {
    if (onScreen) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut"
        }
      });
    }
  }, [onScreen, controls]);

    return (
        <LazyShowStyles>
        <motion.div 
            className="lazy-div"
            ref={rootRef}
            initial={{ opacity: 0, x: -10 }}
            animate={controls}
        >
            {children}
        </motion.div>
        </LazyShowStyles>
    )
}

function useOnScreen(ref, rootMargin = '0px') {
    const [isIntersecting, setIntersecting] = useState(false)
  
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntersecting(entry.isIntersecting)
            },
            { rootMargin }
        )
        if (ref.current) {
            observer.observe(ref.current)
        }
        return () => {
            observer.unobserve(ref.current)
        }
    },
    [],
    );
  
    return isIntersecting;
  }

export default LazyShow