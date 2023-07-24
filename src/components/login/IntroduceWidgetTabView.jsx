import "./introduceWidgetTabView.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const allIngredients = [
    { icon: "📒", label: "노트" },
    { icon: "🗓️", label: "캘린더" },
    { icon: "🎨", label: "그림판" },
];
export const tabs = allIngredients;

// function getNextIngredient(ingredients) {
//   const existing = new Set(ingredients);
//   return allIngredients.find((ingredient) => !existing.has(ingredient));
// }

export default function IntroduceWidgetTabView() {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    return (
        <div className="window">
            <nav>
                <ul>
                {tabs.map((item) => (
                    <li
                        key={item.label}
                        className={item === selectedTab ? "selected" : ""}
                        onClick={() => setSelectedTab(item)}
                    >
                        {`${item.icon} ${item.label}`}
                        {item === selectedTab ? (
                            <motion.div className="underline" layoutId="underline" />
                        ) : null}
                    </li>
                ))}
                </ul>
            </nav>
            <main>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={selectedTab ? selectedTab.label : "empty"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {selectedTab ? selectedTab.icon : "😋"}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    )
}
