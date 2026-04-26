import React, { useState, useMemo, useEffect } from 'react';
import { Bed, Users, Utensils, Wrench, ClipboardList, BookOpen, Settings, LayoutDashboard, ChevronRight, ChevronLeft, ChevronDown, Search, Bell, LogOut, Plus, Check, X, AlertCircle, AlertTriangle, Calendar, Clock, ArrowUpRight, ArrowDownRight, Sparkles, FileText, DollarSign, Mail, Phone, Filter, Download, Printer, ArrowRight, CircleCheck, CircleAlert, Hotel, BarChart3, Receipt, Building2, UserCircle, RefreshCw, Wine, ChefHat, Award, Trash2, Percent, Activity, Leaf, Eye, Star, Globe, Heart, CreditCard, Briefcase, Key, FileSignature, PenLine, Car, Ban, Clock3, CalendarDays, BadgeCheck, LayoutGrid, Hammer, Bath, Package, Camera, MessageSquare, MapPin, Send, TrendingUp, TrendingDown, Coffee, Moon, ShoppingCart, Truck, CheckCircle2, ArrowLeft, Minus, Hash, Menu } from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, ScatterChart, Scatter,
  ZAxis, ReferenceLine
} from 'recharts';

// THEME — The Float (Akosombo, Ghana)
const theme = {
  bg: '#F4EFE6', bgPanel: '#FBF7EE', bgPanelAlt: '#EFE7D6',
  navBg: '#15201F', ink: '#1A2422', inkSoft: '#465250', inkMute: '#8A938F',
  rule: '#DCD3BE', ruleSoft: '#E9E0CB',
  gold: '#B98740', goldSoft: '#F0E0BD', goldDeep: '#8C6428',
  teal: '#2E6B69', tealSoft: '#CFE0DD', tealDeep: '#1B4948',
  hibiscus: '#9C5634', hibiscusSoft: '#EBD6C5',
  dusk: '#3D4F73', duskSoft: '#D5DBE6',
  clay: '#A04848', claySoft: '#EBD0D0',
  leaf: '#5A7747', leafSoft: '#DCE4D0', sand: '#E0D4B8',
};

// ============================================================================
// THE FLOAT BRAND LOGO
// ============================================================================
const FLOAT_LOGO_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCACfAq8DASIAAhEBAxEB/8QAHQABAAMBAAMBAQAAAAAAAAAAAAcICQYDBAUBAv/EAFsQAAEDAwIEAQQKDQgGBwkBAAEAAgMEBQYHEQgSITFBExQiUQkVGDI3OEJhdrQjM0NSVXFzgZGUpbPUFhc0VnSEsdMkV3KCldIlZ3WDksHkNkRHY4Who7LDxP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCmSIiAiIgIiICIvZtlDW3O409ut1LNV1lTI2KCCFhc+R7jsGtA6kkoFsoa253Gnt1upZqusqZGxQQQsLnyPcdg1oHUklaG8KfD1Qaa22PI8nggrcvqWA9dnstzT9zjPYv++ePxN6bl37wocPlFplbo8lyWKGrzCpj6no5lvY4dY4z2LyOjnj/ZHTcusCgrNxZ8ONLm1HPmGD0UNLk8LS+ppI2hjLk0dT8wm9R+V2PgRQSpgnpamWmqYZIJ4nlkkcjS1zHA7FpB6gg9Nlsoq08XHDrBndNPmeGU0cGUxM5qmmbs1tyaB+gSgdj8rsfAgM/UXkqYJ6WplpqmGSCeJ5ZJHI0tcxwOxaQeoIPTZeNAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBEXs2yhrbncae3W6lmq6ypkbFBBCwufI9x2DWgdSSUC2UNbc7jT263Us1XWVMjYoIIWFz5HuOwa0DqSStDuFDh8otMrdHkuSxQ1eYVMfU9HMt7HDrHGexeR0c8f7I6blzhQ4fKLTK3R5LksUNXmFTH1PRzLexw6xxnsXkdHPH+yOm5dYFAVNOLLidqaeumwrTG6GJ0Dyy43mncCS4d4oHeoHu8ePRvrPg4wuJHzjzzTzTyv+w+lDdrtA/7Z4OghcPk+Dnjv2HTcmnKC9HCFxJTZPUwYHqFXR+27gGWy5yEN88PQCGTw8r6nfK7H0tua2CxoY5zHh7HFrmncEHYgq9XCBxHtyRlJgOfVobe2gRW25Su2FcOwikJ+6+p3y+3vvfB9fi44dYM7pp8zwymjgymJnNU0zdmtuTQP0CUDsfldj4EUBqYJ6WplpqmGSCeJ5ZJHI0tcxwOxaQeoIPTZbKKtPFxw6wZ3TT5nhlNHBlMTOappm7NbcmgfoEoHY/K7HwIDP1F5KmCelqZaaphkgnieWSRyNLXMcDsWkHqCD02XjQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERe3ZrZcLzdaW1Wqjmra6rlEUEELC58jydgAAgWa2XC83WltVqo5q2uq5RFBBCwufI8nYAALRHhZ4erbpfRRZFf2xV+X1EWz39HR0Ad3ji9btjs5/j1A6b83l4VtAbfpZamXy+Mhrcvq4tpZRs5lEwjrFEfX98/x7Dp3ndAVLeMLiR84880808r/sPpQ3a7QP+2eDoIXD5Pg5479h03JcYXEj5x55p5p5X/YfShu12gf9s8HQQuHyfBzx37DpuTTlB9/TmiprlqFjdurYmzUtVdqWGaN3Z7HSta4H8YJWr0WH4lFG2KLF7IxjAGta2giAaB2AHL2WVOk3wqYl/wBt0X79i1xQfBqsMw+qppaaoxWySwysLJGOoIiHNI2IPorJjJaWO2ZRc6KkLmx0lbLFEd+oDHkDr6+i2FWP+bvZJml8kjc17HXGoLXNO4IMjuoQXT4QOI9uSMpMBz6tDb20CK23KV2wrh2EUhP3X1O+X299761qxoY5zHh7HFrmncEHYgq7/B/xI+3Hmmn+oVf/ANJdIrXdZ3/0rwEMrj908GuPvux9LYuDouLjh1gzumnzPDKaODKYmc1TTN2a25NA/QJQOx+V2PgRQGpgnpamWmqYZIJ4nlkkcjS1zHA7FpB6gg9Nlsoq08XHDrBndNPmeGU0cGUxM5qmmbs1tyaB+gSgdj8rsfAgM/UXkqYJ6WplpqmGSCeJ5ZJHI0tcxwOxaQeoIPTZeNAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERe3ZrZcLzdaW1Wqjmra6rlEUEELC58jydgAAgWa2XC83WltVqo5q2uq5RFBBCwufI8nYAALRbhW0Bt+llqZfL4yGty+ri2llGzmUTCOsUR9f3z/AB7Dp3cK2gNv0stTL5fGQ1uX1cW0so2cyiYR1iiPr++f49h07zugKlvGFxI+ceeaeaeV/wBh9KG7XaB/2zwdBC4fJ8HPHfsOm5PacfeomXYlitsx3H4p6KhvjZWV1zjBBDW7fYGuHvS4Ek+JA2HTmVBUBd5pvpBqJqHaq26Yljk1fRUR5ZJnSsia5+2/IzncOd23gN9txvtuN+s4ZtB71qze2V1Y2e34nSybVldts6YjvDDv3cfF3Zo6nc7A6PYxYrRjNgo7DYaCGgttFGI4IIhs1o/xJJ3JJ6kkk7koMhSLjZLzs5tRb7lQVHZwMcsErHeIPVrmuH5iFMsXFdrcyNrDk1I8tABc62U+7vnOzFZzi04eKbUWimyzE4IqbLYI95Ixs1lyY0dGuPYSAdGuPf3rumxbnxXUtTQ1s1FW08tNUwSOjmhlYWvje07FrgeoIPTYoJpqeKvW2enkh/lPTR87S3njtsAc3fxB5Oh+dQ7abdcr5eKe2WylqK+4VkojhhiaXySvcegA8Sv5s1suF5utLarVRzVtdVyiKCCFhc+R5OwAAWi3CtoDb9LLUy+XxkNbl9XFtLKNnMomEdYoj6/vn+PYdO4UV1O0oz3TZtHJmNgkt8NaPsEzZWTRlwG5YXMJAcPUeviNwuJBIO4OxC19zfFrFmmMVmOZHQR11uq2cskbu7T4Oae7XA9QR1BWavEVovfdIsn8hP5SusFW8m3XEN6PHfycm3RsgHcdiOo8QAsXwfcSIu4o9PtQa/a5DaG13SZ39J8GwyuP3Twa4++7H0ti63KxoBIO4OxC0W4HNQMuzjTWqhymmqZ22iVlNSXeX/31mx3YT8p8ezQXeIc3fqCSHyuLjh1gzumnzPDKaODKYmc1TTN2a25NA/QJQOx+V2PgRQGpgnpamWmqYZIJ4nlkkcjS1zHA7FpB6gg9Nlsoq08XHDrBndNPmeGU0cGUxM5qmmbs1tyaB+gSgdj8rsfAgM/UXkqYJ6WplpqmGSCeJ5ZJHI0tcxwOxaQeoIPTZeNB/cMZlmZE0gF7g0b9uqst7irVP8P4Z+uVP8Oq22/+n0/5Vv8AiFsigoB7irVP8P4Z+uVP8OnuKtU/w/hn65U/w6v+iCgHuKtU/wAP4Z+uVP8ADp7irVP8P4Z+uVP8Or/ogy21y0RyvR+G0y5LcLLVi6umbB7XzSvLfJ8nNzc8bNvfjbbfxUYK6fsmP9AwP8rX/wCFOqWICsNifCJqTkuK2nI6G94lHSXWhhrYGTVVQJGslYHtDgICA7Zw32JG/iVXlay6E/Ahgf0bt31aNBn5rPw7ZrpRicOS5FdMeqqSWsZRtZQVEz5A9zXuBIfE0bbMPj6uih1aDeyKfAVQfSCn/czrPlAU4aVcMWe6j4NQ5fY7vjVPQVrpWxx1lTOyUeTkdGdw2Fw7tO3U9FB60r4HPi0Y1+VrPrUqCpmpHCxqDgeE3PLbveMXnobdG2SaOlqZ3SuBe1o5Q6FoPVw7kKB1qBxf/FuzL+yxfv41l+gL6eJ2SqyXKrTjlDJDHV3WuhooHzEiNr5XhjS4gEhu7hvsCdvAr5i7PQn4b8D+klu+sxoJm9xVqn+H8M/XKn+HT3FWqf4fwz9cqf4dX/RBQD3FWqf4fwz9cqf4dPcVap/h/DP1yp/h1f8ARBlNrbpRkWkl/orLklbaquorKXzqN1vlkewM53N2Jexh33afArgFaf2SP4Ucb/7E/wD7yKrCAiIgIiICnPS3hfz7UTBLdmNku+M09BcPK+SjrKmdsrfJyviPMGwuHvmHbYnpt+JQYtMuCX4sWI/3367OgrN7irVP8P4Z+uVP8OnuKtU/w/hn65U/w6v+iCgHuKtU/wAP4Z+uVP8ADrlNWOGbPNNcJqstvt2xqpoaaSON8dFUTvlJe8NGwfC0dz16rSpQZx2fFuvf9qpP37EGbSIiCc9LeF/PtRMEt2Y2S74zT0Fw8r5KOsqZ2yt8nK+I8wbC4e+Ydtiem34l/WpvC3qBp/g1yy+83jGJ6C3NY6aOkqZ3Su55GxjlDoWg9XjuR03VveCX4sWI/wB9+uzrz8ZvxaMw/JU31qFBmMiIgIiICIuq0qwS+aj5vRYrYIg6oqDzSzOB8nTxDbnlefBo3/OSAOpCDn7Vb6+63GC3Wuhqa+tqHckNPTROklkd6mtaCSfmCm7FOE3WO+wxzVNrt1ijk32NzrA1wAG+5bGHuG/bYjf1gDqrvaK6QYfpVY2UdhomTXGSMNrLpMwGoqT036/JZuOjB0HzncmQkGel24NdW6Km8rTVWMXJ++3kaauka/sTv9liY35u/ioWzzA8wwS4igy7Hq60zOJEZmZvHLt35JG7sePnaStdF8vKceseU2OosmRWuluduqG7SQVDOZp+ceIcPBw2I7ghBj2inHiq0Iq9Jr0y6Wl01ZidwlLKWZ/V9NJsT5GQ+PQEtd4gHxB3g5AREQFIeiGkGVau3W42/GZrdTe18DZqievkkZEOZ2zWAsY88x2cQNttmnqo8Wj/AAMYT/JPQ+kudRDyV+RSm4yEjqIiOWEfi5Bzj8oUFb7zwb6p220VtxN1xSr81p3z+Qp6qoMsvK0u5GAwAFx22G5A3PcKuC2YWW/FLhP8g9br/aIYfJ0FTL5/Qjbp5Gbd2w+Zrudn+4gi9ERB3mieleQ6tZJV2HHKy10lTSUZrJH18sjGFgexmwLGPO+7x4evqpd9xVqn+H8M/XKn+HXn9jf+GC/fR+T6xAr8IKAe4q1T/D+GfrlT/Dp7irVP8P4Z+uVP8Or/AKIKAe4q1T/D+GfrlT/Dp7irVP8AD+GfrlT/AA6v+iDH3MbDWYtll2xq4SQS1drrJaOd8DiY3PjcWktJAJG46bgfiXyV3XEH8OudfSCt/fOXCoPbs1suF5utLarVRzVtdVyiKCCFhc+R5OwAAWi3CtoDb9LLUy+XxkNbl9XFtLKNnMomEdYoj6/vn+PYdO/rcIWhto0+xejy25tirsoulKyUzEAtoopGgiKP5yD6TvHsOnewCAvm2HILDf2VD7Fe7bdW00phndRVTJhE8d2O5CeV3zHqqf8AGFxI+ceeaeaeV/2H0obtdoH/AGzwdBC4fJ8HPHfsOm5Nb9GtS8i0tzGHIbBKHNIEdZRyE+Sq4t9yx3qPiHdwfzghqZl+N2TLccrMeyG3w19trGcksMg/QQe7XA9Q4dQRuFTe18F96GqDoa+9UrsJin8q2oa8+dzQ77iHl22a/boX9vED5KtdpHqLjepuIQZHjlTzMd6FTTPI8rSy7dY3jwPqPYjqF2CD0cfs9rx+y0llstDDQ26jiEVPTwt2axo8B/iSepJJPVeO8X+xWapo6a73q226euk8lSR1VUyJ1Q/p6MYcQXu6joNz1XKa36p45pRiD73e5PLVUu7KCgjcBLVygdh6mjcczuwHrJAOZ+qWf5JqPl9Rk2SVhlqZDywxM3EVNGD6McY8Gj9JO5JJJKDW1V64peHGj1O2yTFnUdsytmzZnS7shrmDptIWgkPA7P2O4HKemxbxfB9xIi7ij0+1Br9rkNobXdJnf0nwbDK4/dPBrj77sfS2LrcoIL4XeH626U0BvN6dTXLLalhbJUxguipGH7nDuAevyn7AnsNh3nRCQBuTsAqU8XXEsyuiq8B05rz5seaG6XeF23lR2dDC4fJ8HPHfsOnUhcaxX2yX6Gaax3m3XSKCUwzPo6lkzY5B3Y4tJ2cPUeq9XN8WsWaYxWY5kdBHXW6rZyyRu7tPg5p7tcD1BHUFZfaIap5HpRl7L3ZJPLUsuzK+gkcRFVxA9j6nDc8ru4PrBIOmOlmf43qRiNNkmNVgmp5ByzQu2EtNJt1jkb4OH6CNiCQQUFS7LwX3huqD6e63qnkwqGTyramN+1XUR79IeTbZr/Au7bHcbnoLoY/Z7Xj9lpLLZaGGht1HEIqenhbs1jR4D/Ek9SSSeq95cFrfqnjmlGIPvd7k8tVS7soKCNwEtXKB2HqaNxzO7AeskAh1l0v1itVdRUN0vVuoauvf5OjgqapkclQ/72NriC8/MN19FZG6kZzkef5hU5TkVc+aumd9jDSQynYDu2OMfJa3w+fcnckk3F4QOI9uSMpMBz6tDb20CK23KV2wrh2EUhP3X1O+X29974Pr8XHDrBndNPmeGU0cGUxM5qmmbs1tyaB+gSgdj8rsfAigNTBPS1MtNUwyQTxPLJI5GlrmOB2LSD1BB6bLZRVd409B7VkWP3PUrHxBb73baZ9Vcme9jroY27ucfVK1oOx+VtseuxAUJREQFswsZ1swgp17Jj/QMD/K1/8AhTqliun7Jj/QMD/K1/8AhTqliAiIgLWXQn4EMD+jdu+rRrJpay6E/Ahgf0bt31aNBEHsinwFUH0gp/3M6z5Ww2RY/YckoG0GRWS23ikbIJWwV9KyeMPAIDg14I3AJG/zlc9/NPpZ/q0wz/gVN/yIMmlpXwOfFoxr8rWfWpV3X80+ln+rTDP+BU3/ACLprHZ7TYbZFa7Ha6G10ERcY6Wjp2wxM3JJ2Y0ADckk9O5QRpxf/FuzL+yxfv41l+tQOL/4t2Zf2WL9/Gsv0BdnoT8N+B/SS3fWY1xi7PQn4b8D+klu+sxoNZVQf2SD4YLD9H4/rE6vwuB1I0c031FvFPd8yxz2zraenFNFL57UQ8sYc5wbtHI0Hq5x3I36oMpUWmXuXNCf6jftat/zl4qzhe0LjpJpGYPs5sbiD7bVvQgflkGaSIiAiIgIiIC0y4JfixYj/ffrs6zNWmXBL8WLEf779dnQefjN+LRmH5Km+tQrMZa66m4bbNQMGuWIXmesgoLi1jZpKR7Wyt5JGyDlLmuA6sHcHpuoJ9xVpZ+H8z/XKb+HQUARX/8AcVaWfh/M/wBcpv4dUz1vxS3YPqvkGJ2maqnobbUiKGSqc10rhyNPpFrWgnr4AIOMREQaZcEvxYsR/vv12defjN+LRmH5Km+tQrwcEvxYsR/vv12defjN+LRmH5Km+tQoMxkREBERAWh/Afp3Biuk0eVVdM1t3yQ+XL3D0mUoJETB6g7q/p35m79htngthMQt0VoxOz2mANEVFQQU7A0bANZG1o2/Qg8Gd5PasMw+6ZTepTHQW2nM0vL753g1jfW5ziGj5yFmbrNrXnOp93qJbrdKijtBcfN7TTSubTxM67BwH2x23dzvWdth0VrfZGrzUUWk9ls0LnNjuV2DpiPlMijcQ0/7zmn/AHVQdB93DcwyjDbmy5Yvfq+01LXAl1PKWtft4Pb714+ZwIWjHCprKzVzC5n3GOGnyK1ubFcIY+jZA4ehM0eAds4EeBafAhZlKwPAJeai3cQNLbo3uEN1t9TTyt8DyM8qD+Yx/wD3KC+upeIWzPMFu2J3dgNNcKcxh/LuYn92SD52uAcPxLJa/Wutsd8r7LcYvJVtBUyU1Qz72Rji1w/SCti1mTxn2uK1cSGUsgaGx1L4KoAffSQRuefzuLj+dBDqIiDqdJsSqM61IsOJ0/MPbGsZHK5o6xxD0pH/AO6wOP5lrTQUlPQUNPQ0cLYaanibFDG3sxjRs0D5gAFSr2OPBzU3q+6hVcW8VGz2toSR91fs+Vw+cN5B/wB4VZ/iCy4YNo3kuRsl8nUw0boqQ77Hy8m0cZH4nOB/ECg8OiepVFqPT5NLS8g9p77UW9nL90haR5KX8Thv+gqE/ZFsH9scMtGeUkW81om80rHAfcJT6BPzNk2H/eKMvY7stNp1VuWKzy8tPfKEuiaT3ngJc3/8Zl/QFd3UPGaTMsGvWLV2wgudHJTlxHvHOHovHztds4fOEGQqL27zbqu0XettNfEYayiqH09RGe7JGOLXD8xBXqICIiCzPscXw33n6Nz/AFmmV/1QD2OL4b7z9G5/rNMr/oMoeIP4dc6+kFb++cuFXdcQfw6519IK3985cKgIiILZcJPEvDjVFBg2otY8WeFgZbbm5peaUDtDJtuTH967u3sfR25fc4sOJ2C8UE2FaZ3B5op2Flxu8YcwytPeGHfYhp+U/wAew6bk1BRARFIum+iepWoVhqr5i2OvqrfAS1s0szIRM8d2x85HOR47dB2336IPQ0Z1MyTSzL4sgx+bmY7ZlbRSOPkquLfqxw8D6nd2n84N6bjxWaWQacjKKa5OqLnJD9jsfKRVeW2+1uO2zWg939tu252BzouVDWWy4VFvuNLNSVlNI6KeCZhY+N4Oxa5p6gg+C9dB1WqefZHqRl9TkuS1flqiX0YYWbiKmiB9GONvg0b/AIydydySVyq92xWm5328Utns1DUV9wq5BHBTwMLnyOPgAP0/MOqvtotwn4VZ8IDNQrXHesgrov8ASf8ASHiOj37MiLCPSHTd/XqDsdu4Z+gkHcHYhXU4VOKGidbYsP1RuraeenYG0N6qCeWVg7Rzu8HAdnnoR7479XQNxJ6I3rSLI+Zvla/GqyQ+19w5e3j5KXboJAPzOA3HiGxGgttxc8SzL9BUYLpzcHe1T2llyusRLTVA94Yj3Efg53yuw9HcuqSinfhX0AuGqd0bfL42ehxClk2lmHovrXjvFEfV98/w7Dr2CCF22jOpmSaWZfFkGPzczHbMraKRx8lVxb9WOHgfU7u0/nBt9xCcKONXbF/bHTG1xWi+UMfSibK4xVzAPe7vJ5ZPU7fYno7vzCiNdS1NDWzUVbTy01TBI6OaGVha+N7TsWuB6gg9Nig0cuvFTpXTacjKaS6ed3GSL7FZAC2q8tt9rf02a0Hu/wB7sOnMdgaD6p59kepGX1OS5LV+WqJfRhhZuIqaIH0Y42+DRv8AjJ3J3JJXKr38fs90yC9UllstDNXXGslEVPTwt3c9x8P/ADJPQAEnog9BfrHOY8PY4tc07gg7EFd9qto9n2mMVHPltm83pazpFUwytmiD9tzG5zejXbddj32O2+xXAILtcKnFBT1lLHiGqV3ip6qFm1De6p4YyZo+5zuPQPA7PPR3yjzdXcXxicRUGZRTYFg1Tz2APHthcG7jz5zTuI2f/KBAJPyiBt6I9KrKICIiAtmFjOtmEFOvZMf6Bgf5Wv8A8KdUsV0/ZMf6Bgf5Wv8A8KdUsQEREBay6E/Ahgf0bt31aNZNLWXQn4EMD+jdu+rRoPk8RWqf80OCU+Ue0Xt15a4R0Xm/nfm+3MyR3Nzcj+3Jttt491Xz3c//AFXft/8A9Ou69kU+Aqg+kFP+5nWfKC5nu5/+q79v/wDp1ZbQ7Pv5zdNLbmftT7U+fOmb5r5x5fk8nK+P3/K3ffl37DusnVpXwOfFoxr8rWfWpUH1eL/4t2Zf2WL9/Gsv1qBxf/FuzL+yxfv41l+gLs9CfhvwP6SW76zGuMXZ6E/Dfgf0kt31mNBrKoD4kOI3+Z3MKDHv5He3fndvbW+X9s/N+TeR7OXl8k/f3m++/j2U+Kk3H5hOZ5LqpZa3HMRv95po7GyKSagt01Qxr/LzHlLmNIB2IO3zhB7vu5/+q79v/wDp1/FRxx+Vgki/mv5edpbv7fdtx/Z1Wn+afVP/AFaZn/wKp/5E/mn1T/1aZn/wKp/5EHGIvtZPieVYv5v/ACmxq9WTznm839saGWn8ry7c3LztHNtzN327bj1r4qAiIgIiIC0y4JfixYj/AH367OszVplwS/FixH++/XZ0Eh6m5lbNP8GuWX3mCsnoLc1jpo6RjXSu55GxjlDnNB6vHcjpuoJ92rpZ+AMz/U6b+IXdcZvxaMw/JU31qFZjIL/+7V0s/AGZ/qdN/EKmet+V27ONV8gyy0w1UFDcqkSwx1TWtlaORo9INc4A9PAlcYiAiIg0y4JfixYj/ffrs68/Gb8WjMPyVN9ahXg4JfixYj/ffrs6+nxZ2q53vh7yq12a21lyr546cQ0tJA6WWTapiJ5WNBJ2AJ6DsCgy6Rdn/NPqn/q0zP8A4FU/8ifzT6p/6tMz/wCBVP8AyIOMRdjNpXqfDC+abTjMI42NLnvfZKkNaB1JJLOgXHIC1607vUOR4DYL9TuDo7hbYKkEeHPG0kfMQSRt8yyFV8/Y+9Sob1hE+ndxqALlZS6aiDndZaR7tyB6yx7iPxPb6kH0PZDscqLro3Q3ymY5/tLc2ST7A+jDK0xk/wDjMf6Vn4tishtFuv8AY62yXelZV0FdA6CoheOj2OGxHzfj8FnrrPws6gYdd558WttTlNhe5zqeSjZz1MTepDJIh6RcB8pgIPzE8qCv6sb7Hxj1RdNcJL22P/RrLbpZHvPYPlHkmt/GQ55/E0rgcO0B1dye6MoafB7vbWlwD6i60z6OKMesmQAkf7IJ+ZaA8PWk9q0jwcWSkmFZcap4nuVby7GaXbYBo7hjR0aPnJ7koJIWYXGFeYr5xGZbUQODoqaojoht4OhiZG8f+NrloRrbqBbtNNOLplNc+MywxmOigcetRUuBEbAO5G/U7dmhx8FlHcaypuFwqa+tmdPVVMrpppHd3vcSXOPzkklB4F+tBc4NaCSTsAO5X4pc4RMI/lzrnZaWeHytvtjvbOtBG7SyIgtafmdIWNI9RKC/nDvhX83+juPY5LF5OtZTCeu6dfOJfTkB/wBknl/E0KPuNjDtRs/xCy4zglhfcqY1jqu4vFZBAG8jeWJh8o9pcCXvPTcAtHzKwKivJ+IjRzGsgrrBesybTXGgmMFTC23VUgjeO7eZkRaSPmJQVF0v0B17w3UXH8oiwZ3/AEbXxTyAXai3fGHDnb9u8W8w/OtDlDPuo9Cf68/smt/yVJGBZjjed45HkOKXNtxtksj42zCJ8fpNOzgWva1w/OEFDuPnCP5NayDIaWHkocjpxU7gbAVDNmSj8Z9B5+d5VdlpHxw4Ocv0Ora+lh56/H5PbKLYdTE0ETN/FyEv/wBwLNxAREQWZ9ji+G+8/Ruf6zTK/wCqAexxfDfefo3P9Zplf9BlDxB/DrnX0grf3zlwq7riD+HXOvpBW/vnLhUBERAREQdhotZLBkmq2N2LKKzzSz1tcyKpk5+XcHszm+TzO2bv4c261ds1st9mtVLarVRw0VDSRCKCCFgayNgGwAAWOSuRwhcSr2SUuAaj3EuY4iK13eofuWnsIZnHw8GvPbsemxAStxS8Pdr1Pts2QWCKGhzGCMcku/LHXNaOkUvgHbdGv8OgPTbbPmlxfIarLm4lT2erkvpqjSeYiP7KJQdi0jw22O5PQAE9lsAvkxYzjsWTS5NFYray+TRCKS4NpmCoewDYNMm3MRtsO/YAeAQRPwu6DWvSiyi53MQ12W1kW1VVAbtpmnr5GL5vW7u4j1bBTcvx7msYXvcGtaNySdgAqg618Yb7LmQs+nVvtl2t9FLy1lfV87mVRB9JsPK4bNH3533PYbDdwWpy/HLLluOVmPZDQRV9trI+SaGQd/UQe4cDsQR1BAIWbPEnojetIsj5m+Vr8arJD7X3Dl7ePkpdugkA/M4DceIboRo3qRj+qOFwZJYJC3c+Tq6R7gZaWYDqx236QfEEH5h01/s1oyC1TWm+WyjudBONpaaqhbJG/bqN2uG3Q9QfAoM7eFbQC4ap3Vl8vjJqLEKSXaWUbtfXPB6xRH1ffP8ADsOvbRWzWy32a1UtqtVHDRUNJEIoIIWBrI2AbAABftottvtFtp7ZaqGmoKGmYGQU9PEI442+prR0AXDa76tY7pLibrtd3CpuE4LLdbmPAkqpB/8Aqwbjmdt0+ckAhIarpxacPFNqLRTZZicEVNlsEe8kY2ay5MaOjXHsJAOjXHv713TYt5vhu4rXZbkrsZ1Gjt1sqq2Xa21tM0xwFxPSGQOcdj4Ndvsex67E2vQY/WjGb/dsrhxWgtVVLe5qnzVtEWFsglB2LXA7cu2x33222JO2y0a4Z9B7LpNZGVtY2C4ZZVR7VldtuIQdt4Yd+zB4u7uPU7DYCUKfGMbp8lnyaCw2yK9zxiKa4MpWCokb6i8DmPYePgPUF9Z7msYXvcGtaNySdgAg+TmWPWPKsarrDklDDW2uriLZ4pe23fmB+SQeocOoI3Cyc1Dtlls2dXu1Y7dPbW0UlbJFR1nQ+WjDiGncdD6uYdDtuOhVkOL/AIj3ZI+rwHAa0tsjSYrlconbGtPYxRkfcvW75fYej76qKAiIgIiIC2YWM6mb3Ueu39ef2TRf5KCbfZMf6Bgf5Wv/AMKdUsXa6maqZ7qTHQR5rfvbVtvMhpR5pBD5Mv5eb7Uxu+/I3vv2XFICIiAtZdCfgQwP6N276tGsmlLNi4j9Z7HY6CyWvMvN6C300dLSxe1lI7ycUbQ1jd3REnZoA3JJ9aC1vsinwFUH0gp/3M6z5Uhai606mahWKOx5hkvtnb46htSyHzGnh2ka1zQ7mjjaezndN9uqj1AWlfA58WjGvytZ9alWaikvBteNVsJxmmxvGMq8wtVKXmGD2vpZeUveXu9J8bnHdziep8UF9eL/AOLdmX9li/fxrL9ShmHEBq5l2N1mOZDlvntrrWhlRB7XUsfOA4OA5mRBw6gHoQovQF2ehPw34H9JLd9ZjXGL3bFdK+x3ygvdrn83r7fUx1VLLyNd5OWNwcx2zgQdnAHYgj1oNi0WZvuo9dv68/smi/yU91Hrt/Xn9k0X+Sg0yRZm+6j12/rz+yaL/JT3Ueu39ef2TRf5KCZvZNP/AIff/Uv/APKqZrs9TdUs71K9r/5a33219rvK+af6JBD5PynJz/amN335Gd99tuniuMQEREBERAWmXBL8WLEf779dnWZqk3Cde9WMLxikxnGcr8wtNHz+b0/tfSycnO9z3ek+MuO7nOPUnv6kF7OM34tGYfkqb61CsxlJ2Z6+6tZjjNZjeR5Z59aq0NFRB7XUsfOGvDx6TIg4ek0HoR2UYoCIiAiIg0y4JfixYj/ffrs6mZZaYTr3qxheMUmM4zlfmFpo+fzen9r6WTk53ue70nxlx3c5x6k9/Uvs+6j12/rz+yaL/JQaZIszfdR67f15/ZNF/kp7qPXb+vP7Jov8lBo9l/8A7J3j+wT/ALtyx7Uw1nE3rhV0k1JUZvzwzRujkb7VUY5muGxG4h37FQ8gL6+HZJesRyWhyPH66SiuVDKJIZWevxBHYtI3BB6EEgr5CINLOH3iKxDU6iprdXVFPY8qIDJLfNJysqH+uncffg9+T3w69wOYzYsZ1I2J656t4vCyCz55d2wsBDIqp7apjAQBsGzB4A6dAO3Xbug1SXH6o6mYZptZzcssvMNIS3eClYeepqD6o4x1PXpv0aPEhZ4XniP1tu1IaWqz6ujjO/Wkp4KV/UEe/iY13j6/n7qMLpcK+6181wuldU11ZM7mlqKmV0kkh9bnOJJP40Ei8Q+sd81eyoVtW11FZqMuZbbeH7iJp7veflSO6bn5gB26xgiICvx7Hjg4s2m9wzWrh5au/VBjp3EdRTQktG3q5pOff1hrVQdStjnEVrFjthobFZcuZR26hhbBTQMtVGQxjRsBuYiSfnJJJ6k7oNKc5yClxTDbzktbt5C2UUtU9pO3NyNJDR85IAHzkLIq8XCqu12rLrXymWrrJ31E8h7ue9xc4/nJKkTNNfdW8xxqrxvI8udWWusDRUQNoKaLnDXBwHNHG1wG7R2PXseijFAVx/Y3cy5KrJMBqZQBI1t0o2l23pDljmA9ZI8kf90/mpwvu4Ll2RYPksGR4tcnW66U7XsjmEbJAA9pa4FrwWkEE9wfA9wEGu9XTw1dLNS1MTZYJmOjkY4bhzSNiD8xBWS2r2Iz4HqZf8TnDtrfWOZC53d8J9KJ352Oafzru/dR67f15/ZNF/kqO9Qs2ybP8g9v8tuLLhcvItgM4pooSWN35QRG1oJG56kb7bDfYBBzqIiCzPscXw33n6Nz/WaZX/WRunGe5Zp3fJr3h129rK+emdSyS+bxTc0TnNcW7SNcPfMad9t+n41IHuo9dv68/smi/wAlByfEH8OudfSCt/fOXCr38hu9xyC+198u9R5zcLhUPqaqbkazykj3FzncrQANyT0AAXoICIiAiIgIiILjcHvEj5v5np5qHX/YfRhtN2nf9r8GwTOPyfBrz27HpsRdF7msYXvcGtaNySdgAsaFJFy1z1TuOADB6zLKqWzeSEDwWM8tJEPubpdudzfAgnqOh6dEEzcX/Ee7JH1eA4DWltkaTFcrlE7Y1p7GKMj7l63fL7D0ffVRREHbaNamZJpZl8V/x6fmY7ZlZRyE+Rq4t/ePHr9Tu4P5wdLNGdTMb1TxCLIMfm5Xt2ZW0Ujh5Wkl26scPEep3Zw/OBk6un03z7LNO78b3iN2kt9W6MxSei18crD8l7HAtcPEbjoeoQaUa+6w45pHjIr7mfPLrUgtt9tjeBJO4d3E/JYPF35hueizV1JzfItQstqsmyatNTWTnZrR0jgjHvY42/JaN+34ydyST4c8zHJM6yKW/wCVXWa5XCUBvlJNg1jR2Yxo2DWjc9AAOp9a+AgK6fB7xI+ceZ6eah1/2f0YbTdp3/bPBsEzj8rwa89+x67E0sRBsu9zWML3uDWtG5JOwAVFuL/iPdkj6vAcBrS2yNJiuVyidsa09jFGR9y9bvl9h6PvobuuuuqlzwIYTW5ZVS2fyIgePJsE0sQ+Q+Xbnc3bodz1HQ7hRqgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiApt4XNB7lqxe/bK5eWocTopQ2rqm9H1DxsfIxfPsRu7s0H1kBQkrfcC+uFnsdHFpfk7oqGOapdJaq9xDWF8h3MMh8CXblrvHflO3TcO24g+FHGrrija/TG1xWm+W+LpRiVxir2Ae9JeTyyep3ieju4c2iNdS1NDWzUVbTy01TBI6OaGVha+N7TsWuB6gg9NitklXril4caPU7bJMWdR2zK2bNmdLuyGuYOm0haCQ8Ds/Y7gcp6bFoZ94/Z7pkF6pLLZaGauuNZKIqenhbu57j4f+ZJ6AAk9FfTSLhJwW04WIc+oRfL/AFbN6iRlTJHHSEj3kXIRvt98d9yOmw6LqeGHQS1aS2g3G4mnuOWVbOWprGAllOw/codwCG+t2wLvmGwU2EgDcnYBBmDxKaLXbSHKGR+UfXY9XucbbXEdSB1MUm3aRoI+Zw6jxDYlVoeOXWuz5zVUuB4u6OstdprDU1Vwb1bPUNa5gbEfFjQ9+7uzienQAuq8gIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiILp8HvEj5x5np5qHX/Z/RhtN2nf9s8GwTOPyvBrz37HrsTcVYzq5vCVxNMZS0+C6j1k73xgR2y6lj5XPHYQy8oLiR4P27dHdtyFynuaxhe9wa1o3JJ2ACo5xb8Szr6K3AdPasstW5huN2if1qx2dFER2j8C75fYej1d4eL7iQOStqMDwGrnis43iuldyOifVOB2MLAdnCMfKJALu3vffVRQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH/9k=";
const FloatLogo = ({ size = 'md' }) => {
  const heights = { xs: 18, sm: 22, md: 28, lg: 36, xl: 48 };
  const h = heights[size] || 28;
  return (
    <img src={FLOAT_LOGO_DATA_URL} alt="The Float" style={{ height: `${h}px`, width: 'auto', display: 'block', mixBlendMode: 'screen' }} />
  );
};


const fmt = (n) => new Intl.NumberFormat('en-GH').format(Math.round(n));
const cedi = (n) => '₵ ' + fmt(n);
const pct = (n) => n.toFixed(1) + '%';




const HOTEL = { name: 'The Float', tagline: 'Waterfront Luxury · Akosombo' };

// ============================================================================
// SHARED ATOMS · used across all persona workspaces
// ============================================================================
const Pill = ({ children, tone = 'neutral', size = 'md' }) => {
  const tones = {
    neutral: { bg: theme.ruleSoft, fg: theme.inkSoft, border: theme.rule },
    gold: { bg: theme.goldSoft, fg: theme.goldDeep, border: theme.gold + '50' },
    teal: { bg: theme.tealSoft, fg: theme.tealDeep, border: theme.teal + '40' },
    leaf: { bg: theme.leafSoft, fg: theme.leaf, border: theme.leaf + '40' },
    clay: { bg: theme.claySoft, fg: theme.clay, border: theme.clay + '40' },
    dusk: { bg: theme.duskSoft, fg: theme.dusk, border: theme.dusk + '40' },
  };
  const t = tones[tone] || tones.neutral;
  const sizes = { sm: 'text-[10px] px-1.5 py-0', md: 'text-xs px-2 py-0.5' };
  return <span className={`inline-flex items-center gap-1 ${sizes[size]} rounded-full font-medium`} style={{ background: t.bg, color: t.fg, border: `1px solid ${t.border}` }}>{children}</span>;
};


const Btn = ({ children, variant = 'primary', size = 'md', icon: Icon, onClick }) => {
  const variants = {
    primary: { bg: theme.gold, fg: '#FBF7EE', border: theme.gold },
    secondary: { bg: 'transparent', fg: theme.ink, border: theme.ink },
    ghost: { bg: 'transparent', fg: theme.inkSoft, border: 'transparent' },
  };
  const v = variants[variant];
  const sizes = { sm: 'px-3 py-1.5', md: 'px-4 py-2' };
  return (
    <button onClick={onClick} className={`${sizes[size]} inline-flex items-center gap-2 font-medium transition-all`}
      style={{ background: v.bg, color: v.fg, border: `1px solid ${v.border}`, borderRadius: '2px', letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: size === 'sm' ? '10px' : '11px' }}>
      {Icon && <Icon size={size === 'sm' ? 12 : 14} />}{children}
    </button>
  );
};


const Card = ({ title, action, children, padded = true, accent }) => (
  <div style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderTop: accent ? `2px solid ${accent}` : `1px solid ${theme.rule}`, borderRadius: '2px' }}>
    {title && <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${theme.rule}` }}><h3 className="font-serif text-base" style={{ color: theme.ink }}>{title}</h3>{action}</div>}
    <div className={padded ? 'p-5' : ''}>{children}</div>
  </div>
);


const SectionHeader = ({ overline, title, action }) => (
  <div className="flex items-end justify-between mb-6">
    <div>
      {overline && <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>{overline}</div>}
      <h1 className="font-serif" style={{ fontSize: '32px', color: theme.ink, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{title}</h1>
    </div>
    {action}
  </div>
);


const KpiTile = ({ label, value, sublabel, tone, icon: Icon }) => (
  <div className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderRadius: '2px' }}>
    <div className="flex items-baseline justify-between mb-3">
      <span className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.16em', fontWeight: 600 }}>{label}</span>
      {Icon && <Icon size={14} style={{ color: tone || theme.inkMute }} />}
    </div>
    <div className="font-serif" style={{ fontSize: '32px', color: tone || theme.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
    {sublabel && <div className="text-xs mt-2" style={{ color: theme.inkSoft }}>{sublabel}</div>}
  </div>
);


const InfoTile = ({ label, value }) => (
  <div className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
    <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>{label}</div>
    <div className="text-sm" style={{ color: theme.ink, fontWeight: 500 }}>{value}</div>
  </div>
);

// ============================================================================
// TAPE CHART — visual reservation grid (FOM primary tool)
// ============================================================================

// NAV + PERSONA

const KpiCard = ({ kpi, format = 'number' }) => {
  const v = format === 'currency' ? cedi(kpi.value) : format === 'percent' ? pct(kpi.value) : fmt(kpi.value);
  const positive = kpi.invert ? kpi.delta < 0 : kpi.delta > 0;
  return (
    <div className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderRadius: '2px' }}>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>{kpi.label}</span>
        {kpi.delta !== 0 && (
          <span className="text-xs flex items-center gap-0.5" style={{ color: positive ? theme.leaf : theme.clay }}>
            {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{Math.abs(kpi.delta)}%
          </span>
        )}
      </div>
      <div className="font-serif" style={{ fontSize: '28px', color: theme.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>{v}</div>
    </div>
  );
};

// ============================================================================
// SIDEBAR + TOP BAR
// ============================================================================




// ============================================================================
// MANAGING DIRECTOR · Charles Botha
// ============================================================================
const MD_NAV = [
  { id: 'md-pack', label: 'Performance Pack', icon: BarChart3 },
  { id: 'md-budget', label: 'Annual Budget', icon: DollarSign },
  { id: 'md-reports', label: 'Reports Library', icon: FileText },
];
// ============================================================================
// SIDEBAR — Managing Director
// ============================================================================
const MdSidebar = ({ activeNav, setActiveNav }) => (
  <aside className="hidden md:flex w-64 flex-shrink-0 flex-col" style={{ background: theme.navBg, color: '#FBF7EE' }}>
    <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <FloatLogo size="md" />
          <div className="text-[10px] mt-1" style={{ color: theme.gold, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Ghana</div>
        </div>
      </div>
    </div>
    <div className="px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium" style={{ background: theme.gold, color: theme.navBg, fontSize: '13px' }}>CB</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm" style={{ fontWeight: 500 }}>Charles Botha</div>
          <div className="text-[10px]" style={{ color: theme.gold, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>Managing Director</div>
        </div>
      </div>
    </div>
    <nav className="flex-1 px-3 py-3 overflow-y-auto">
      {MD_NAV.map(item => {
        const Icon = item.icon;
        const active = activeNav === item.id;
        return (
          <button key={item.id} onClick={() => setActiveNav(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all text-sm"
            style={{ background: active ? 'rgba(185,135,64,0.15)' : 'transparent', color: active ? theme.gold : 'rgba(255,255,255,0.75)', borderLeft: active ? `3px solid ${theme.gold}` : '3px solid transparent', fontWeight: active ? 600 : 400 }}>
            <Icon size={15} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: theme.gold, color: theme.navBg, fontWeight: 700 }}>{item.badge}</span>}
          </button>
        );
      })}
    </nav>
    <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span>v1.0</span>
        <button className="hover:text-white"><LogOut size={12} /></button>
      </div>
    </div>
  </aside>
);

const MdTopBar = () => (
  <div className="flex items-center justify-between pl-16 pr-4 md:px-8 py-3 md:py-4" style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
    <div className="flex items-center gap-3 text-sm" style={{ color: theme.inkSoft }}>
      <Calendar size={14} /><span className="hidden md:inline">Saturday, 25 April 2026
    </span><span className="md:hidden">Sat 25 Apr</span></div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
        <Search size={13} style={{ color: theme.inkMute }} />
        <input placeholder="Search…" className="bg-transparent outline-none text-sm w-48" style={{ color: theme.ink }} />
      </div>
      <button className="relative p-2"><Bell size={15} style={{ color: theme.inkSoft }} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: theme.gold }} /></button>
    </div>
  </div>
);

// MOCK DATA
const KPIS_TODAY = {
  occupancy: { value: 87.5, delta: +4.2, label: 'Occupancy' },
  adr: { value: 1840, delta: +6.1, label: 'ADR' },
  revpar: { value: 1610, delta: +10.6, label: 'RevPAR' },
  fbCost: { value: 31.4, delta: -1.8, label: 'F&B Cost %', invert: true },
  revenue: { value: 187500, delta: +12.3, label: "Today's Revenue" },
  arrivals: { value: 14, delta: 0, label: 'Arrivals Today' },
};

const WEEK_REV = [
  { day: 'Sun', actual: 22400, budget: 22000, costPct: 30.8 },
  { day: 'Mon', actual: 18600, budget: 19500, costPct: 32.1 },
  { day: 'Tue', actual: 19400, budget: 20000, costPct: 33.8 },
  { day: 'Wed', actual: 21200, budget: 20500, costPct: 31.6 },
  { day: 'Thu', actual: 24800, budget: 22000, costPct: 31.2 },
  { day: 'Fri', actual: 31200, budget: 26000, costPct: 30.4 },
  { day: 'Sat', actual: 28450, budget: 25000, costPct: 31.4 },
];

const ANNUAL_BUDGET_LINES = [
  // Revenue
  { line: 'Rooms Revenue', category: 'revenue', proposed: 47200000, lastYear: 41040000, justification: 'Based on 78% target occupancy, ADR uplift of 4% to ₵1,750. New direct booking strategy.' },
  { line: 'F&B Revenue', category: 'revenue', proposed: 14400000, lastYear: 11760000, justification: 'New banquet contracts secured (Asante Wedding, GIPC). Sunset Bar refresh launching Q3.' },
  { line: 'Spa & Wellness', category: 'revenue', proposed: 2640000, lastYear: 2340000, justification: 'Two additional therapists; partnership with Volta Yacht Club for wellness packages.' },
  { line: 'Other Revenue', category: 'revenue', proposed: 380000, lastYear: 336000, justification: 'Pool day-pass programme, ferry transfer fees.' },
  // Cost of Sales
  { line: 'F&B Cost of Sales', category: 'cogs', proposed: -4320000, lastYear: -3720000, justification: 'Direct-from-fisherman supplier saving 8%. Kitchen extraction overhaul should reduce wastage.' },
  { line: 'Spa Supplies', category: 'cogs', proposed: -528000, lastYear: -540000, justification: 'Negotiated rate with new vendor (12% saving).' },
  { line: 'Guest Amenities', category: 'cogs', proposed: -816000, lastYear: -744000, justification: 'Premium-tier amenities aligned with brand positioning.' },
  // Payroll
  { line: 'Front of House', category: 'payroll', proposed: -6480000, lastYear: -5940000, justification: '2 additional FOH staff for peak season; statutory increases.' },
  { line: 'Housekeeping', category: 'payroll', proposed: -4560000, lastYear: -4320000, justification: 'Statutory increases; same headcount.' },
  { line: 'Kitchen & F&B', category: 'payroll', proposed: -5760000, lastYear: -5280000, justification: 'New sous chef position; statutory increases.' },
  { line: 'Maintenance & Engineering', category: 'payroll', proposed: -1440000, lastYear: -1380000, justification: 'Statutory increases; same headcount.' },
  { line: 'Admin & Management', category: 'payroll', proposed: -2160000, lastYear: -2040000, justification: 'New HR Manager position approved.' },
  // OpEx
  { line: 'Utilities (ECG + Water)', category: 'opex', proposed: -2400000, lastYear: -2016000, justification: 'ECG tariff increase forecast at 12%. Solar array offset reducing exposure.' },
  { line: 'OTA Commission', category: 'opex', proposed: -1776000, lastYear: -1500000, justification: 'Tracked at 12% of online bookings. Goal: shift mix to direct.' },
  { line: 'Marketing', category: 'opex', proposed: -1440000, lastYear: -936000, justification: 'New brand campaign Q2; international wholesaler trade shows; SEO investment.' },
  { line: 'Repairs & Maintenance', category: 'opex', proposed: -1104000, lastYear: -1056000, justification: 'Pool plant overhaul scheduled Q3. AC unit replacement programme (Floor 2).' },
  { line: 'Cleaning Supplies', category: 'opex', proposed: -456000, lastYear: -432000, justification: 'Volume increase tracking occupancy.' },
  { line: 'Linen & Laundry', category: 'opex', proposed: -744000, lastYear: -696000, justification: 'Linen cycle replacement programme; same volume.' },
  { line: 'Insurance', category: 'opex', proposed: -540000, lastYear: -504000, justification: 'Premium increase forecast 7%.' },
  { line: 'Licenses & Compliance', category: 'opex', proposed: -264000, lastYear: -264000, justification: 'No change. Includes GTA, Ghana Fire Service, Food Hygiene.' },
];

const CAPEX_REQUESTS = [
  { id: 'CAPEX-2026-01', item: 'AC unit replacement programme (Floor 2 — 8 units)', amount: 240000, justification: 'Aging units running inefficiently; recurring WO costs increasing.', priority: 'must-have' },
  { id: 'CAPEX-2026-02', item: 'Sunset Bar refresh + new cocktail station', amount: 180000, justification: 'Refresh aligned with new menu launch. ROI through ADR uplift.', priority: 'must-have' },
  { id: 'CAPEX-2026-03', item: 'Pool plant overhaul (filtration, heater, pump)', amount: 145000, justification: 'End of life. Failure risk affects guest experience.', priority: 'must-have' },
  { id: 'CAPEX-2026-04', item: 'Solar array Phase 2 (additional 30kW)', amount: 380000, justification: 'Returns 18%/yr through ECG offset. Aligns with sustainability positioning.', priority: 'should-have' },
  { id: 'CAPEX-2026-05', item: 'Guest-facing mobile app development', amount: 95000, justification: 'In-room ordering, spa booking, check-out.', priority: 'should-have' },
  { id: 'CAPEX-2026-06', item: 'Lakeside deck extension (covered)', amount: 220000, justification: 'Additional banquet capacity for weddings.', priority: 'nice-to-have' },
];

const REPORTS = [
  { id: 'rep-mgr-flash', name: "Daily Manager's Flash", category: 'Operational', description: 'Single-page summary of yesterday: occupancy, ADR, RevPAR, F&B, by-department revenue.', frequency: 'Daily', delivery: 'Email · 06:00', lastRun: '25 Apr 2026', formats: ['PDF'], audience: 'GM' },
  { id: 'rep-perf-pack', name: 'Monthly Performance Pack', category: 'Strategic', description: 'GOPPAR, Revenue vs. Budget, Occupancy, ADR, RevPAR, EBITDA, Cash Position, P&L, GM strategic notes.', frequency: 'Monthly', delivery: 'Email · 1st of month', lastRun: '01 Apr 2026', formats: ['PDF'], audience: 'MD', favorite: true },
  { id: 'rep-quarter', name: 'Quarterly Performance Pack', category: 'Strategic', description: 'Quarterly summary with year-on-year comparatives, departmental performance, and strategic outlook.', frequency: 'Quarterly', delivery: 'Email · quarter-end', lastRun: '31 Mar 2026', formats: ['PDF'], audience: 'MD', favorite: true },
  { id: 'rep-budget', name: 'Annual Budget Pack', category: 'Strategic', description: 'Full annual budget with operating budget, CapEx plan, key assumptions, and 12-month phasing.', frequency: 'Annual', delivery: 'Email · 15 March', lastRun: '15 Mar 2026', formats: ['PDF', 'XLSX'], audience: 'MD', favorite: true },
  { id: 'rep-rev', name: 'Daily Revenue Report', category: 'Financial', description: 'Revenue by source, room type, channel; with day/MTD/YTD vs. budget.', frequency: 'Daily', delivery: 'Email · 06:00', lastRun: '25 Apr 2026', formats: ['PDF', 'XLSX'], audience: 'GM' },
  { id: 'rep-occ', name: 'Occupancy & Pace Report', category: 'Operational', description: 'Forward-looking occupancy by date, pace vs. last year, lead time analysis.', frequency: 'Daily', delivery: 'On-demand', lastRun: '25 Apr 2026', formats: ['PDF', 'XLSX'], audience: 'GM' },
  { id: 'rep-arr', name: 'Arrivals & Departures', category: 'Operational', description: 'Today\'s expected arrivals and departures with VIP, special requests, and folio status.', frequency: 'Daily', delivery: 'Email · 06:00 + on-demand', lastRun: '25 Apr 2026', formats: ['PDF'], audience: 'FOM' },
  { id: 'rep-fb-cost', name: 'F&B Cost Analysis', category: 'Financial', description: 'Theoretical vs. actual cost % by category, with variance flags.', frequency: 'Weekly', delivery: 'Email · Monday', lastRun: '21 Apr 2026', formats: ['PDF', 'XLSX'], audience: 'F&B Manager + GM' },
  { id: 'rep-adr', name: 'ADR & Rate Mix Report', category: 'Strategic', description: 'Average Daily Rate by room type, channel, season; with rate plan effectiveness.', frequency: 'Monthly', delivery: 'Email · 5th of month', lastRun: '05 Apr 2026', formats: ['PDF', 'XLSX'], audience: 'GM' },
  { id: 'rep-revpar', name: 'RevPAR Analysis', category: 'Strategic', description: 'Revenue per available room with year-on-year and competitive set comparison.', frequency: 'Monthly', delivery: 'Email · 5th of month', lastRun: '05 Apr 2026', formats: ['PDF'], audience: 'MD + GM' },
  { id: 'rep-na', name: 'Night Audit Pack', category: 'Operational', description: 'Full audit trail: cashier reconciliation, bank deposits, no-show charges, system close.', frequency: 'Daily', delivery: 'Email · 03:00', lastRun: '25 Apr 2026', formats: ['PDF'], audience: 'GM + Chief Accountant' },
  { id: 'rep-bva', name: 'Budget vs. Actuals', category: 'Financial', description: 'Department-by-department P&L with variance analysis (₵ and %), MTD/QTD/YTD.', frequency: 'Monthly', delivery: 'Email · 5th of month', lastRun: '05 Apr 2026', formats: ['PDF', 'XLSX'], audience: 'MD + GM' },
  { id: 'rep-dashboard', name: 'Executive Dashboard', category: 'Strategic', description: 'High-level KPIs in single visual: occupancy, ADR, RevPAR, GOPPAR, F&B cost trend.', frequency: 'On-demand', delivery: 'On-demand', lastRun: '24 Apr 2026', formats: ['PDF'], audience: 'MD' },
  { id: 'rep-hk-prod', name: 'Housekeeping Productivity', category: 'Operational', description: 'Average minutes per room by attendant, room turnaround time, OOO/OOS analysis.', frequency: 'Weekly', delivery: 'Email · Monday', lastRun: '21 Apr 2026', formats: ['PDF'], audience: 'Executive Housekeeper + GM' },
  { id: 'rep-pm', name: 'Maintenance & PM Compliance', category: 'Operational', description: 'PM schedule status, work order ageing, asset condition, utility consumption.', frequency: 'Monthly', delivery: 'Email · 5th of month', lastRun: '05 Apr 2026', formats: ['PDF'], audience: 'Maintenance Lead + GM' },
];


// MODULES
const MDPack = () => {
  const KPIS = [
    { label: 'GOPPAR (MTD)', value: cedi(1840), delta: '+8.4%' },
    { label: 'Revenue vs. Budget', value: '+6.2%', delta: 'on track' },
    { label: 'Occupancy (MTD)', value: '83.1%', delta: '+5.1pp' },
    { label: 'ADR (MTD)', value: cedi(1710), delta: '+4.4%' },
    { label: 'RevPAR (MTD)', value: cedi(1421), delta: '+9.7%' },
    { label: 'EBITDA (MTD)', value: cedi(412000), delta: '+11.2%' },
    { label: 'Cash Position', value: cedi(2400000), delta: 'healthy' },
  ];
  return (
    <div className="p-4 md:p-6 space-y-6" style={{ background: theme.bg, minHeight: '100%' }}>
      <SectionHeader overline="Monthly Performance Pack" title="April 2026 — The Float"
        action={<div className="flex gap-2"><Btn variant="secondary" icon={Printer}>Print A4</Btn><Btn variant="primary" icon={Download}>Download PDF</Btn></div>} />
      <div className="p-6" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.gold}` }}>
        <div className="flex items-center gap-3 mb-2">
          <Mail size={14} style={{ color: theme.gold }} />
          <span className="text-[10px] uppercase" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>Delivered automatically</span>
        </div>
        <p className="font-serif text-base leading-relaxed" style={{ color: theme.inkSoft }}>
          Hello Charles — this pack summarises April&apos;s performance. Delivered to you on the 1st of every month and again at quarter-end.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {KPIS.map(k => (
          <div key={k.label} className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>{k.label}</div>
            <div className="font-serif text-2xl mb-1" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>{k.value}</div>
            <div className="text-xs" style={{ color: theme.leaf }}>{k.delta}</div>
          </div>
        ))}
      </div>
      <Card title="Revenue — Last 12 Months" accent={theme.gold}>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={[
            { m: 'May', a: 4200, b: 4100 }, { m: 'Jun', a: 4480, b: 4250 }, { m: 'Jul', a: 5120, b: 4800 },
            { m: 'Aug', a: 5340, b: 5000 }, { m: 'Sep', a: 4720, b: 4600 }, { m: 'Oct', a: 4960, b: 4800 },
            { m: 'Nov', a: 4280, b: 4200 }, { m: 'Dec', a: 5680, b: 5400 }, { m: 'Jan', a: 4140, b: 4000 },
            { m: 'Feb', a: 4680, b: 4400 }, { m: 'Mar', a: 5040, b: 4800 }, { m: 'Apr', a: 5235, b: 4950 },
          ]}>
            <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={theme.gold} stopOpacity={0.4} /><stop offset="100%" stopColor={theme.gold} stopOpacity={0.02} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="2 4" stroke={theme.rule} vertical={false} />
            <XAxis dataKey="m" stroke={theme.inkMute} tick={{ fontSize: 11, fill: theme.inkSoft }} axisLine={false} />
            <YAxis stroke={theme.inkMute} tick={{ fontSize: 11, fill: theme.inkSoft }} axisLine={false} tickFormatter={(v) => '₵' + v + 'k'} />
            <Tooltip contentStyle={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }} />
            <Area type="monotone" dataKey="a" stroke={theme.gold} strokeWidth={2} fill="url(#g1)" name="Actual" />
            <Line type="monotone" dataKey="b" stroke={theme.teal} strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Budget" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

// ============================================================================
// GM DASHBOARD
// ============================================================================
const MDBudgetModule = () => {
  const [tab, setTab] = useState('opex');
  const [decision, setDecision] = useState(null);

  const totals = useMemo(() => {
    const sumBy = (cat) => ANNUAL_BUDGET_LINES.filter(l => l.category === cat).reduce((acc, l) => ({
      proposed: acc.proposed + l.proposed,
      lastYear: acc.lastYear + l.lastYear,
    }), { proposed: 0, lastYear: 0 });
    const revenue = sumBy('revenue');
    const cogs = sumBy('cogs');
    const payroll = sumBy('payroll');
    const opex = sumBy('opex');
    const gop = {
      proposed: revenue.proposed + cogs.proposed + payroll.proposed + opex.proposed,
      lastYear: revenue.lastYear + cogs.lastYear + payroll.lastYear + opex.lastYear,
    };
    return { revenue, cogs, payroll, opex, gop };
  }, []);

  const totalCapex = CAPEX_REQUESTS.reduce((s, c) => s + c.amount, 0);
  const mustHaveCapex = CAPEX_REQUESTS.filter(c => c.priority === 'must-have').reduce((s, c) => s + c.amount, 0);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Owner · Annual Approval</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Annual Budget · FY 2026/27</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Submitted by Jana Kruger (GM) on 15 March 2026 · Awaiting MD approval</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Download}>Download Pack</Btn>
            <Btn variant="ghost" icon={MessageSquare}>Discuss with GM</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        {/* Banner — the big context */}
        <div className="p-6" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.gold}` }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: theme.goldSoft, color: theme.gold }}>
              <ClipboardList size={22} />
            </div>
            <div className="flex-1">
              <div className="font-serif" style={{ fontSize: '22px', color: theme.ink, letterSpacing: '-0.01em' }}>Charles, the FY 2026/27 budget is ready for your review</div>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: theme.inkSoft }}>
                This is your once-a-year strategic decision. Jana has prepared the operating budget, capital plan, and key assumptions.
                The package totals projected GOP of <span className="font-medium" style={{ color: theme.ink }}>{cedi(Math.abs(totals.gop.proposed))}</span> on revenue of <span className="font-medium" style={{ color: theme.ink }}>{cedi(totals.revenue.proposed)}</span>.
                Ratification today releases the operational budget for the year ahead.
              </p>
            </div>
          </div>
        </div>

        {/* High-level summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Total Revenue" value={cedi(totals.revenue.proposed)}
            sublabel={`+${(((totals.revenue.proposed - totals.revenue.lastYear) / totals.revenue.lastYear) * 100).toFixed(1)}% vs last year`}
            icon={TrendingUp} tone={theme.leaf} />
          <KpiTile label="Total OpEx" value={cedi(Math.abs(totals.cogs.proposed + totals.payroll.proposed + totals.opex.proposed))}
            sublabel="cogs + payroll + operating" icon={DollarSign} tone={theme.dusk} />
          <KpiTile label="Projected GOP" value={cedi(Math.abs(totals.gop.proposed))}
            sublabel={`${((Math.abs(totals.gop.proposed) / totals.revenue.proposed) * 100).toFixed(1)}% margin`}
            icon={Award} tone={theme.gold} />
          <KpiTile label="CapEx Requested" value={cedi(totalCapex)}
            sublabel={`${cedi(mustHaveCapex)} must-have`} icon={Building2} tone={theme.teal} />
        </div>

        {/* Tabs */}
        <div style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
          <div className="flex gap-1 border-b" style={{ borderColor: theme.rule }}>
            {[
              { id: 'opex', label: 'Operating Budget', icon: BarChart3 },
              { id: 'capex', label: 'Capital Plan', icon: Building2 },
              { id: 'assumptions', label: 'Key Assumptions', icon: FileText },
            ].map(t => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)} className="flex items-center gap-2 px-5 py-3 text-sm transition-all"
                  style={{
                    color: active ? theme.ink : theme.inkSoft, fontWeight: active ? 600 : 400,
                    borderBottom: active ? `2px solid ${theme.gold}` : '2px solid transparent', marginBottom: '-1px',
                  }}>
                  <Icon size={14} />{t.label}
                </button>
              );
            })}
          </div>

          {tab === 'opex' && (
            <div className="p-5">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${theme.rule}` }}>
                    <th className="text-left py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Line Item</th>
                    <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Last Year</th>
                    <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>FY 2026/27</th>
                    <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Change</th>
                    <th className="text-left py-2 px-4 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Justification</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(CATEGORY_META).map(([key, meta]) => {
                    const lines = ANNUAL_BUDGET_LINES.filter(l => l.category === key);
                    const subtotal = totals[key];
                    const change = ((subtotal.proposed - subtotal.lastYear) / Math.abs(subtotal.lastYear)) * 100;
                    return (
                      <React.Fragment key={key}>
                        <tr style={{ background: meta.soft + '40', borderBottom: `1px solid ${theme.rule}` }}>
                          <td className="py-2.5 text-[10px] uppercase" style={{ color: meta.color, letterSpacing: '0.16em', fontWeight: 700 }} colSpan={5}>
                            {meta.label}
                          </td>
                        </tr>
                        {lines.map(l => {
                          const change = ((l.proposed - l.lastYear) / Math.abs(l.lastYear)) * 100;
                          return (
                            <tr key={l.line} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                              <td className="py-2.5" style={{ color: theme.ink }}>{l.line}</td>
                              <td className="py-2.5 text-right font-mono text-xs" style={{ color: theme.inkMute }}>
                                {l.lastYear < 0 ? '(' + fmt(Math.abs(l.lastYear / 1000)) + 'k)' : fmt(l.lastYear / 1000) + 'k'}
                              </td>
                              <td className="py-2.5 text-right font-mono" style={{ color: theme.ink, fontWeight: 500 }}>
                                {l.proposed < 0 ? '(' + fmt(Math.abs(l.proposed / 1000)) + 'k)' : fmt(l.proposed / 1000) + 'k'}
                              </td>
                              <td className="py-2.5 text-right" style={{ color: change >= 0 === (key === 'revenue') ? theme.leaf : theme.clay, fontWeight: 600 }}>
                                {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                              </td>
                              <td className="py-2.5 px-4 text-xs italic" style={{ color: theme.inkSoft }}>{l.justification}</td>
                            </tr>
                          );
                        })}
                        <tr style={{ borderBottom: `2px solid ${meta.color}`, background: meta.soft + '20' }}>
                          <td className="py-2.5 font-serif" style={{ color: theme.ink, fontWeight: 600 }}>{meta.label} Total</td>
                          <td className="py-2.5 text-right font-mono text-xs" style={{ color: theme.inkMute }}>
                            {subtotal.lastYear < 0 ? '(' + fmt(Math.abs(subtotal.lastYear / 1000)) + 'k)' : fmt(subtotal.lastYear / 1000) + 'k'}
                          </td>
                          <td className="py-2.5 text-right font-mono" style={{ color: theme.ink, fontWeight: 700 }}>
                            {subtotal.proposed < 0 ? '(' + fmt(Math.abs(subtotal.proposed / 1000)) + 'k)' : fmt(subtotal.proposed / 1000) + 'k'}
                          </td>
                          <td className="py-2.5 text-right" style={{ color: theme.ink, fontWeight: 600 }}>
                            {change >= 0 ? '+' : ''}{change.toFixed(1)}%
                          </td>
                          <td></td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                  <tr style={{ borderTop: `2px solid ${theme.ink}`, background: theme.bgPanelAlt }}>
                    <td className="py-3 font-serif" style={{ color: theme.ink, fontWeight: 700, fontSize: '15px' }}>Projected GOP</td>
                    <td className="py-3 text-right font-mono" style={{ color: theme.inkSoft, fontWeight: 600 }}>
                      {fmt(totals.gop.lastYear / 1000)}k
                    </td>
                    <td className="py-3 text-right font-mono" style={{ color: theme.gold, fontWeight: 700, fontSize: '15px' }}>
                      {fmt(totals.gop.proposed / 1000)}k
                    </td>
                    <td className="py-3 text-right" style={{ color: theme.leaf, fontWeight: 700 }}>
                      +{(((totals.gop.proposed - totals.gop.lastYear) / Math.abs(totals.gop.lastYear)) * 100).toFixed(1)}%
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {tab === 'capex' && (
            <div className="p-5 space-y-3">
              {CAPEX_REQUESTS.map(c => {
                const tone = c.priority === 'must-have' ? 'clay' : c.priority === 'should-have' ? 'gold' : 'neutral';
                const label = c.priority === 'must-have' ? 'Must Have' : c.priority === 'should-have' ? 'Should Have' : 'Nice to Have';
                return (
                  <div key={c.id} className="p-4 grid grid-cols-12 gap-4 items-center"
                    style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}`, borderLeft: `3px solid ${c.priority === 'must-have' ? theme.clay : c.priority === 'should-have' ? theme.gold : theme.inkMute}` }}>
                    <div className="col-span-1 font-mono text-[10px]" style={{ color: theme.inkMute }}>{c.id}</div>
                    <div className="col-span-6">
                      <div className="font-serif" style={{ fontSize: '17px', color: theme.ink, letterSpacing: '-0.01em' }}>{c.item}</div>
                      <div className="text-xs mt-1 italic" style={{ color: theme.inkSoft }}>{c.justification}</div>
                    </div>
                    <div className="col-span-2 text-right">
                      <div className="font-serif text-xl" style={{ color: theme.gold, letterSpacing: '-0.02em' }}>{cedi(c.amount)}</div>
                    </div>
                    <div className="col-span-1"><Pill tone={tone}>{label}</Pill></div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <button className="px-3 py-1.5 text-xs" style={{ background: 'transparent', border: `1px solid ${theme.rule}`, color: theme.inkSoft, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Defer</button>
                      <button className="px-3 py-1.5 text-xs font-medium" style={{ background: theme.leaf, border: `1px solid ${theme.leaf}`, color: '#FBF7EE', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Approve</button>
                    </div>
                  </div>
                );
              })}
              <div className="pt-3 mt-3 flex items-center justify-between" style={{ borderTop: `2px solid ${theme.ink}` }}>
                <span className="font-serif text-base" style={{ color: theme.ink, fontWeight: 600 }}>Total CapEx Requested</span>
                <span className="font-serif" style={{ fontSize: '24px', color: theme.gold, letterSpacing: '-0.02em' }}>{cedi(totalCapex)}</span>
              </div>
            </div>
          )}

          {tab === 'assumptions' && (
            <div className="p-5 space-y-4">
              {[
                { label: 'Average Occupancy', value: '78%', detail: 'Based on 2024/25 actuals (74%) plus +4pp from new wholesale partnerships and direct booking strategy.' },
                { label: 'Average Daily Rate (ADR)', value: cedi(1750), detail: 'Modest 4% inflation-aligned uplift from current ₵1,684. Suite rates increase 6% reflecting demand.' },
                { label: 'F&B Cost % Target', value: '30%', detail: 'Improvement from 31.4% current. Direct-from-fisherman supplier saves 8% on lake fish; portion control programme.' },
                { label: 'Inflation (Ghana CPI)', value: '11%', detail: 'BoG forecast for 2026. Applied to non-statutory cost lines.' },
                { label: 'ECG Tariff Increase', value: '12%', detail: 'Energy Commission published guidance. Solar array Phase 2 (CapEx 04) hedges this.' },
                { label: 'Direct Booking Mix', value: '52%', detail: 'Up from 44%. New website + loyalty programme. Reduces OTA commission exposure.' },
                { label: 'Headcount', value: '38 FTE', detail: '+3 vs current (FOH ×2, Kitchen ×1, HR Manager ×1). Statutory increases applied across.' },
                { label: 'Foreign Exchange', value: '₵12.4 / USD', detail: 'BoG forecast year-average. Material to imported wine, spa supplies.' },
              ].map(a => (
                <div key={a.label} className="p-4 grid grid-cols-12 gap-4" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                  <div className="col-span-3">
                    <div className="text-[10px] uppercase mb-1" style={{ color: theme.gold, letterSpacing: '0.14em', fontWeight: 700 }}>{a.label}</div>
                    <div className="font-serif" style={{ fontSize: '24px', color: theme.ink, letterSpacing: '-0.02em' }}>{a.value}</div>
                  </div>
                  <div className="col-span-9 text-sm flex items-center" style={{ color: theme.inkSoft }}>{a.detail}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Decision panel */}
        <div className="p-6" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderTop: `3px solid ${theme.gold}` }}>
          <div className="font-serif mb-2" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>Your Decision</div>
          <p className="text-sm mb-5" style={{ color: theme.inkSoft }}>
            This is the only operational decision required from you this year. Once approved, the operating budget is released to the GM and management team.
            Any changes during the year above ₵10,000 require your separate ratification (these flow through Approvals).
          </p>
          {decision === null ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <button onClick={() => setDecision('approve')}
                className="p-5 text-left transition-all hover:translate-y-[-1px]"
                style={{ background: theme.leafSoft, border: `1px solid ${theme.leaf}40`, borderLeft: `3px solid ${theme.leaf}` }}>
                <div className="flex items-center gap-2 mb-2"><Check size={18} style={{ color: theme.leaf }} /><span className="text-[10px] uppercase" style={{ color: theme.leaf, letterSpacing: '0.14em', fontWeight: 700 }}>Recommended</span></div>
                <div className="font-serif text-lg" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Approve as Submitted</div>
                <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>Ratify the GM&apos;s budget and CapEx plan in full.</div>
              </button>
              <button onClick={() => setDecision('discuss')}
                className="p-5 text-left transition-all hover:translate-y-[-1px]"
                style={{ background: theme.bg, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.gold}` }}>
                <div className="flex items-center gap-2 mb-2"><MessageSquare size={18} style={{ color: theme.gold }} /></div>
                <div className="font-serif text-lg" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Discuss with GM</div>
                <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>Raise questions before approving. Schedule a 1:1 with Jana.</div>
              </button>
              <button onClick={() => setDecision('reject')}
                className="p-5 text-left transition-all hover:translate-y-[-1px]"
                style={{ background: theme.bg, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.clay}` }}>
                <div className="flex items-center gap-2 mb-2"><X size={18} style={{ color: theme.clay }} /></div>
                <div className="font-serif text-lg" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Send Back for Revision</div>
                <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>Return to GM with strategic feedback for resubmission.</div>
              </button>
            </div>
          ) : (
            <div className="p-5" style={{
              background: decision === 'approve' ? theme.leafSoft : decision === 'discuss' ? theme.goldSoft : theme.claySoft,
              border: `1px solid ${decision === 'approve' ? theme.leaf : decision === 'discuss' ? theme.gold : theme.clay}40`,
              borderLeft: `3px solid ${decision === 'approve' ? theme.leaf : decision === 'discuss' ? theme.gold : theme.clay}`,
            }}>
              <div className="flex items-start gap-3">
                {decision === 'approve' ? <Check size={20} style={{ color: theme.leaf, marginTop: 2 }} />
                  : decision === 'discuss' ? <MessageSquare size={20} style={{ color: theme.gold, marginTop: 2 }} />
                  : <X size={20} style={{ color: theme.clay, marginTop: 2 }} />}
                <div className="flex-1">
                  <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>
                    {decision === 'approve' ? 'Budget approved' : decision === 'discuss' ? 'Discussion requested' : 'Sent back for revision'}
                  </div>
                  <p className="text-sm mt-2" style={{ color: theme.inkSoft }}>
                    {decision === 'approve' && 'Operating budget and CapEx plan released to the GM. Annual budget of approximately ₵5.4m GOP is now the active target. Notification sent to Jana Kruger.'}
                    {decision === 'discuss' && 'A 1:1 has been requested with the GM. The budget remains in pending state until your follow-up decision.'}
                    {decision === 'reject' && 'Budget returned to the GM with your notes for revision. Resubmission expected within 14 days.'}
                  </p>
                  <button onClick={() => setDecision(null)} className="text-xs mt-3 underline" style={{ color: theme.inkSoft }}>Change decision</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MD REPORTS LIBRARY
// ============================================================================
const MDReportsModule = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const filtered = REPORTS.filter(r => {
    if (filterCategory !== 'all' && r.category !== filterCategory) return false;
    if (showOnlyFavorites && !r.favorite) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: REPORTS.length,
    favorites: REPORTS.filter(r => r.favorite).length,
    daily: REPORTS.filter(r => r.frequency === 'Daily').length,
    onDemand: REPORTS.filter(r => r.delivery.includes('On-demand')).length,
  };

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Library · On-Demand</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Reports Library</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>All scheduled and on-demand reports across the platform</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Mail}>Subscriptions</Btn>
            <Btn variant="primary" icon={Plus}>Custom Report</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Total Reports" value={stats.total} sublabel="across the platform" icon={FileText} />
          <KpiTile label="Your Subscriptions" value={stats.favorites} sublabel="emailed automatically" icon={Mail} tone={theme.gold} />
          <KpiTile label="Daily Reports" value={stats.daily} sublabel="scheduled" icon={Calendar} tone={theme.teal} />
          <KpiTile label="On-Demand" value={stats.onDemand} sublabel="run when needed" icon={ArrowRight} tone={theme.dusk} />
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 p-3" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
          <div className="flex items-center gap-2 px-3 py-1.5 flex-1 max-w-md" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, borderRadius: '2px' }}>
            <Search size={14} style={{ color: theme.inkMute }} />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports…"
              className="bg-transparent border-none outline-none text-sm flex-1" style={{ color: theme.ink }} />
          </div>
          <span className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Category</span>
          {['all', 'Strategic', 'Operational', 'Financial'].map(c => (
            <button key={c} onClick={() => setFilterCategory(c)} className="text-xs px-3 py-1.5"
              style={{
                background: filterCategory === c ? theme.ink : 'transparent',
                color: filterCategory === c ? theme.bgPanel : theme.inkSoft,
                border: `1px solid ${filterCategory === c ? theme.ink : theme.rule}`,
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>{c === 'all' ? 'All' : c}</button>
          ))}
          <div className="flex-1" />
          <label className="flex items-center gap-2 cursor-pointer text-xs" style={{ color: theme.inkSoft }}>
            <input type="checkbox" checked={showOnlyFavorites} onChange={(e) => setShowOnlyFavorites(e.target.checked)} />
            <Star size={12} style={{ color: theme.gold }} />
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>My subscriptions only</span>
          </label>
        </div>

        {/* Reports grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map(r => {
            const catColor = r.category === 'Strategic' ? theme.gold : r.category === 'Operational' ? theme.teal : theme.dusk;
            return (
              <div key={r.id} className="p-5"
                style={{
                  background: theme.bgPanel,
                  border: `1px solid ${theme.rule}`,
                  borderLeft: `3px solid ${catColor}`,
                  borderTop: r.favorite ? `2px solid ${theme.gold}` : `1px solid ${theme.rule}`,
                }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Pill tone={r.category === 'Strategic' ? 'gold' : r.category === 'Operational' ? 'teal' : 'dusk'} size="sm">{r.category}</Pill>
                      {r.favorite && <Pill tone="gold" size="sm"><Star size={9} /> Subscribed</Pill>}
                    </div>
                    <div className="font-serif" style={{ fontSize: '18px', color: theme.ink, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{r.name}</div>
                  </div>
                  <button className="p-1.5" style={{ color: r.favorite ? theme.gold : theme.inkMute }}>
                    <Star size={16} fill={r.favorite ? theme.gold : 'none'} />
                  </button>
                </div>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: theme.inkSoft }}>{r.description}</p>
                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div>
                    <div className="text-[10px] uppercase mb-0.5" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Frequency</div>
                    <div style={{ color: theme.ink }}>{r.frequency}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase mb-0.5" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Delivery</div>
                    <div style={{ color: theme.ink }}>{r.delivery}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase mb-0.5" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Audience</div>
                    <div style={{ color: theme.ink }}>{r.audience}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase mb-0.5" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Last Run</div>
                    <div style={{ color: theme.ink }}>{r.lastRun}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
                  <div className="flex gap-1">
                    {r.formats.map(f => (
                      <span key={f} className="text-[10px] px-1.5 py-0.5 font-mono"
                        style={{ background: theme.bg, color: theme.inkSoft, border: `1px solid ${theme.ruleSoft}` }}>
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Btn variant="ghost" size="sm" icon={Eye}>Preview</Btn>
                    <Btn variant="primary" size="sm" icon={Download}>Run Now</Btn>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12" style={{ background: theme.bgPanel, border: `1px dashed ${theme.rule}`, color: theme.inkMute }}>
            No reports match the current filters.
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// GM REPORTS — operational reporting hub
// ============================================================================

const MdComingSoon = ({ title }) => (
  <div className="p-4 md:p-6" style={{ background: theme.bg, minHeight: '100%' }}>
    <SectionHeader overline="Module" title={title} />
    <div className="p-12 text-center" style={{ background: theme.bgPanel, border: `1px dashed ${theme.rule}` }}>
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ background: theme.tealSoft, color: theme.teal }}><Sparkles size={20} /></div>
      <p className="font-serif text-lg mb-2" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Module defined in the BRD</p>
      <p className="text-sm" style={{ color: theme.inkSoft }}>To be built in the next sprint.</p>
    </div>
  </div>
);

// ============================================================================
// APP
// ============================================================================
const MdApp = () => {
  const [activeNav, setActiveNav] = useState('md-pack');
  let content;
  
  if (activeNav === 'md-pack') content = <MDPack />;
  else if (activeNav === 'md-budget') content = <MDBudgetModule />;
  else if (activeNav === 'md-reports') content = <MDReportsModule />;
  else content = <MdComingSoon title="MD module" />;
  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: theme.bg, fontFamily: '"Inter", system-ui, sans-serif', color: theme.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.rule}; }
      `}</style>
      <MdSidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MdTopBar />
        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
};


// ============================================================================
// GM · DAILY · Jana Kruger
// ============================================================================
const GM_NAV = [
  { type: 'header', label: 'Daily' },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'morning-brief', label: 'Morning Brief', icon: Coffee },
  { id: 'arrivals', label: 'Arrivals & Departures', icon: Bed },
  { id: 'rooms', label: 'Room Status', icon: Hotel },
  { id: 'channels', label: 'Channel Manager', icon: Globe },
  { id: 'approvals', label: 'Approvals', icon: ClipboardList, badge: 4 },
  { id: 'procurement', label: 'Procurement & Inventory', icon: ShoppingCart },
  { type: 'header', label: 'Periodic' },
  { id: 'fb', label: 'F&B Performance', icon: Utensils },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench, badge: 3 },
  { id: 'budget', label: 'Budget vs. Actuals', icon: DollarSign },
  { id: 'night-audit', label: 'Night Audit', icon: Clock },
  { type: 'header', label: 'Reports' },
  { id: 'reports', label: 'Reports Library', icon: FileText },
];
// ============================================================================
// SIDEBAR — General Manager
// ============================================================================
const GmSidebar = ({ activeNav, setActiveNav }) => (
  <aside className="hidden md:flex w-64 flex-shrink-0 flex-col" style={{ background: theme.navBg, color: '#FBF7EE' }}>
    <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <FloatLogo size="md" />
          <div className="text-[10px] mt-1" style={{ color: theme.gold, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Ghana</div>
        </div>
      </div>
    </div>
    <div className="px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium" style={{ background: theme.gold, color: theme.navBg, fontSize: '13px' }}>JK</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm" style={{ fontWeight: 500 }}>Jana Kruger</div>
          <div className="text-[10px]" style={{ color: theme.gold, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>General Manager</div>
        </div>
      </div>
    </div>
    <nav className="flex-1 px-3 py-3 overflow-y-auto">
      {GM_NAV.map((item, idx) => {
        if (item.type === 'header') {
          return (
            <div key={'h-' + idx} className="px-3 pt-4 pb-1.5 first:pt-1" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
              {item.label}
            </div>
          );
        }
        const Icon = item.icon;
        const active = activeNav === item.id;
        return (
          <button key={item.id} onClick={() => setActiveNav(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all text-sm"
            style={{ background: active ? 'rgba(185,135,64,0.15)' : 'transparent', color: active ? theme.gold : 'rgba(255,255,255,0.75)', borderLeft: active ? `3px solid ${theme.gold}` : '3px solid transparent', fontWeight: active ? 600 : 400 }}>
            <Icon size={15} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: theme.gold, color: theme.navBg, fontWeight: 700 }}>{item.badge}</span>}
          </button>
        );
      })}
    </nav>
    <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span>v1.0</span>
        <button className="hover:text-white"><LogOut size={12} /></button>
      </div>
    </div>
  </aside>
);

const GmTopBar = () => (
  <div className="flex items-center justify-between pl-16 pr-4 md:px-8 py-3 md:py-4" style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
    <div className="flex items-center gap-3 text-sm" style={{ color: theme.inkSoft }}>
      <Calendar size={14} /><span className="hidden md:inline">Saturday, 25 April 2026
    </span><span className="md:hidden">Sat 25 Apr</span></div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
        <Search size={13} style={{ color: theme.inkMute }} />
        <input placeholder="Search…" className="bg-transparent outline-none text-sm w-48" style={{ color: theme.ink }} />
      </div>
      <button className="relative p-2"><Bell size={15} style={{ color: theme.inkSoft }} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: theme.gold }} /></button>
    </div>
  </div>
);

// MOCK DATA
const ARRIVALS = [
  { id: 'R1041', guest: 'Anneke Visser', room: '204', type: 'Lakeview Suite', eta: '14:30', vip: true, source: 'Direct', nights: 3, rate: 2840, status: 'expected', special: 'Anniversary — flowers + champagne', nationality: 'Netherlands', confirmed: true, depositPaid: 1500 },
  { id: 'R1042', guest: 'Marcus Holm', room: '108', type: 'Garden Room', eta: '15:00', vip: false, source: 'Booking.com', nights: 2, rate: 1240, status: 'expected', special: '', nationality: 'Sweden', confirmed: true, depositPaid: 0 },
  { id: 'R1043', guest: 'Ines & Carlos Reyes', room: '301', type: 'Volta Suite', eta: '16:00', vip: true, source: 'Direct', nights: 4, rate: 3680, status: 'arrived', special: 'Late dinner reservation 21:00', nationality: 'Spain', confirmed: true, depositPaid: 2000 },
  { id: 'R1044', guest: 'Tomohiro Sato', room: null, type: 'Standard', eta: '16:30', vip: false, source: 'Expedia', nights: 1, rate: 980, status: 'expected', special: 'Arriving by ferry', nationality: 'Japan', confirmed: true, depositPaid: 0 },
  { id: 'R1045', guest: 'Lena Bauer', room: null, type: 'Standard', eta: '17:00', vip: false, source: 'Direct', nights: 2, rate: 1180, status: 'expected', special: '', nationality: 'Germany', confirmed: true, depositPaid: 600 },
  { id: 'R1046', guest: 'Joseph Akinwale', room: '215', type: 'Deluxe', eta: '18:00', vip: false, source: 'Travel Agent', nights: 5, rate: 1650, status: 'expected', special: 'ALLERGY: shellfish', nationality: 'Nigeria', confirmed: true, depositPaid: 0 },
  { id: 'R1048', guest: 'Asante Wedding (8 pax)', room: null, type: '4× Deluxe', eta: '13:00', vip: false, source: 'Direct', nights: 2, rate: 1650, status: 'expected', special: 'Group — wedding party', nationality: 'Ghana', confirmed: true, depositPaid: 5000, group: true },
  { id: 'R1049', guest: 'David Chen', room: null, type: 'Garden Room', eta: '20:00', vip: false, source: 'Booking.com', nights: 3, rate: 1240, status: 'no-show', special: '', nationality: 'Singapore', confirmed: true, depositPaid: 0 },
];

const DEPARTURES = [
  { id: 'R1031', guest: 'Edward Coetzee', room: '105', type: 'Standard', eto: '11:00', nights: 4, status: 'departed', folioBalance: 0, paymentMethod: 'Visa ••• 4112', total: 5680, nationality: 'South Africa' },
  { id: 'R1032', guest: 'Fatima Ndlovu', room: '202', type: 'Deluxe', eto: '11:30', nights: 3, status: 'pending-payment', folioBalance: 1240, paymentMethod: 'Pending', total: 6190, nationality: 'Zimbabwe' },
  { id: 'R1033', guest: 'Ravi Pillai', room: '210', type: 'Deluxe', eto: '12:00', nights: 5, status: 'departed', folioBalance: 0, paymentMethod: 'City Ledger', total: 9450, nationality: 'India' },
  { id: 'R1034', guest: 'Charlotte Devereux', room: '302', type: 'Suite', eto: '12:00', nights: 2, status: 'ready', folioBalance: 0, paymentMethod: 'Mastercard ••• 8821', total: 4920, nationality: 'France' },
  { id: 'R1035', guest: "Brendan O'Hara", room: '113', type: 'Garden Room', eto: '11:00', nights: 3, status: 'pending-payment', folioBalance: 480, paymentMethod: 'Pending', total: 3960, nationality: 'Ireland', note: 'Mini-bar posting added 09:18' },
  { id: 'R1036', guest: 'Kemi Adetola', room: '208', type: 'Deluxe', eto: '14:00', nights: 2, status: 'late-checkout', folioBalance: 0, paymentMethod: 'Settled in advance', total: 3780, nationality: 'Nigeria', note: 'Late check-out approved (VIP)' },
];

const STATUSES = {
  VC: { code: 'VC', label: 'Vacant Clean', color: theme.leaf, soft: theme.leafSoft, ink: '#3A4F2F' },
  VD: { code: 'VD', label: 'Vacant Dirty', color: theme.gold, soft: theme.goldSoft, ink: theme.goldDeep },
  OC: { code: 'OC', label: 'Occupied Clean', color: theme.teal, soft: theme.tealSoft, ink: theme.tealDeep },
  OD: { code: 'OD', label: 'Occupied Dirty', color: theme.hibiscus, soft: theme.hibiscusSoft, ink: theme.hibiscus },
  OOO: { code: 'OOO', label: 'Out of Order', color: theme.clay, soft: theme.claySoft, ink: theme.clay },
  OOS: { code: 'OOS', label: 'Out of Service', color: theme.dusk, soft: theme.duskSoft, ink: theme.dusk },
  IN: { code: 'IN', label: 'Inspected', color: '#7A6B8F', soft: '#E5DFEC', ink: '#4A3E5C' },
};

const ROOMS = [
  ['101','Standard',1,'OC','Edward Coetzee'],['102','Standard',1,'VC',null],['103','Standard',1,'OD','Yuki Tanaka'],
  ['104','Standard',1,'VD',null],['105','Standard',1,'OC','Robert Mensah'],['106','Standard',1,'IN',null],
  ['107','Garden',1,'OC','Sarah Weisz'],['108','Garden',1,'VC',null],['109','Garden',1,'OD','Ndidi Okafor'],
  ['110','Garden',1,'OC','James Pretorius'],['111','Garden',1,'OOS',null],['112','Garden',1,'OD','Hannah Müller'],
  ['113','Garden',1,'VD',null],['201','Deluxe',2,'OC','Ahmed Khoury'],['202','Deluxe',2,'VD',null],
  ['203','Deluxe',2,'OC','Lin Wei'],['204','Lakeview Suite',2,'VC',null],['205','Deluxe',2,'OD','Olivia Brown'],
  ['206','Deluxe',2,'OC','Pavel Dimitrov'],['207','Deluxe',2,'OOO',null],['208','Deluxe',2,'OC','Ezra Goldberg'],
  ['209','Deluxe',2,'VC',null],['210','Deluxe',2,'IN',null],['211','Deluxe',2,'OD','Beatrice Walsh'],
  ['212','Deluxe',2,'OC','Hiroshi Yamada'],['213','Deluxe',2,'VC',null],['214','Deluxe',2,'OC','Aisha Bello'],
  ['215','Deluxe',2,'VD',null],['301','Volta Suite',3,'OC','Ines & Carlos Reyes'],['302','Suite',3,'OD','Charlotte Devereux'],
  ['303','Suite',3,'VC',null],['304','Suite',3,'OC','David & Elena Stern'],
].map(([number, type, floor, status, guest]) => ({ number, type, floor, status, guest }));

const FB_KPIS = {
  revenue: { value: 28450, delta: +14.2, label: 'F&B Revenue' },
  costPct: { value: 31.4, delta: -1.8, label: 'F&B Cost %', invert: true },
  covers: { value: 184, delta: +9.5, label: 'Total Covers' },
  avgSpend: { value: 154.6, delta: +4.3, label: 'Avg Cover Spend' },
};

const OUTLETS = [
  { id: 'restaurant', name: 'The Restaurant', revenue: 14200, covers: 92, costPct: 30.2, vsBudget: 6.2, color: theme.gold },
  { id: 'bar', name: 'Sunset Bar', revenue: 7800, covers: 64, costPct: 22.4, vsBudget: 18.5, color: theme.teal },
  { id: 'pool', name: 'Pool & Deck', revenue: 2640, covers: 18, costPct: 28.8, vsBudget: -2.1, color: theme.hibiscus },
  { id: 'rs', name: 'Room Service', revenue: 2810, covers: 10, costPct: 33.6, vsBudget: -4.4, color: theme.dusk },
];

const TOP_ITEMS = [
  { name: 'Tilapia from the Lake', sold: 28, revenue: 4760 },
  { name: 'Volta Sunset Cocktail', sold: 42, revenue: 3360 },
  { name: 'Jollof with Grilled Chicken', sold: 22, revenue: 3520 },
  { name: 'Banku & Tilapia', sold: 18, revenue: 2700 },
  { name: 'Star Beer (local)', sold: 38, revenue: 1900 },
];

const MENU_MATRIX = [
  { name: 'Volta Sunset', popularity: 88, margin: 85, category: 'Stars', sold: 42 },
  { name: 'Coconut Tart', popularity: 68, margin: 75, category: 'Stars', sold: 16 },
  { name: 'Tilapia', popularity: 92, margin: 70, category: 'Plowhorses', sold: 28 },
  { name: 'Jollof + Chicken', popularity: 78, margin: 65, category: 'Plowhorses', sold: 22 },
  { name: 'Lake Prawns', popularity: 38, margin: 60, category: 'Puzzles', sold: 14 },
  { name: 'Banku & Tilapia', popularity: 42, margin: 65, category: 'Puzzles', sold: 18 },
  { name: 'Goat Pepper Soup', popularity: 28, margin: 70, category: 'Dogs', sold: 10 },
  { name: 'Hibiscus Mocktail', popularity: 18, margin: 80, category: 'Dogs', sold: 8 },
];

// ============================================================================
// MD PERFORMANCE PACK
// ============================================================================
const APPROVAL_REQUESTS = [
  {
    id: 'PR-2089', type: 'Purchase Requisition', dept: 'Kitchen', amount: 8400, requester: 'Chef Olamide',
    requesterRole: 'Executive Chef', subject: 'Weekend produce + wine top-up',
    description: 'Saturday & Sunday weekend trade is forecast at +30% covers. Requesting top-up of: Lake fish (40kg), beef striploin (12kg), seasonal vegetables, mixed wine case (12 bottles). Supplier: Akosombo Fresh Market + Volta Vintners.',
    submitted: '25 Apr 08:14', priority: 'normal', dueBy: '25 Apr 14:00',
    breakdown: [
      { item: 'Lake fish (40kg)', cost: 1800 },
      { item: 'Beef striploin (12kg)', cost: 1920 },
      { item: 'Seasonal vegetables', cost: 1280 },
      { item: 'Wine case (12 bottles)', cost: 3400 },
    ],
    attachments: ['quote_akosombo_fresh.pdf', 'wine_quote_volta.pdf'],
  },
  {
    id: 'PR-2091', type: 'Purchase Requisition', dept: 'Housekeeping', amount: 3200, requester: 'Akua Mensah',
    requesterRole: 'Executive Housekeeper', subject: 'Linen replacement (12 sets)',
    description: 'End-of-life replacement of 12 bath towel sets and 8 bathrobes. Current stock failing par count consistently. Supplier: Tema Linen Supply.',
    submitted: '24 Apr 16:32', priority: 'normal', dueBy: '28 Apr',
    breakdown: [
      { item: 'Bath towel sets ×12', cost: 1680 },
      { item: 'Bathrobes ×8', cost: 1520 },
    ],
    attachments: ['tema_linen_quote.pdf'],
  },
  {
    id: 'JV-0457', type: 'Journal Voucher', dept: 'Finance', amount: 12500, requester: 'Adriaan van der Berg',
    requesterRole: 'Chief Accountant', subject: 'June accruals — utilities',
    description: 'Accrual entry for June ECG and water utility bills not yet received. Based on April actuals + 5% seasonal adjustment.',
    submitted: '24 Apr 11:08', priority: 'normal', dueBy: '30 Apr',
    breakdown: [
      { item: 'ECG accrual', cost: 9800 },
      { item: 'Ghana Water accrual', cost: 2700 },
    ],
    attachments: [],
  },
  {
    id: 'PO-1140', type: 'Purchase Order', dept: 'Maintenance', amount: 5800, requester: 'Sipho Dube',
    requesterRole: 'Maintenance Lead', subject: 'Pool pump replacement (PM-008 follow-up)',
    description: 'Pool filtration pump approaching end of life per quarterly inspection. Akwaaba Pools quoted ₵5,800 fitted. Service window: 28 April. Linked to PM-008.',
    submitted: '23 Apr 14:20', priority: 'high', dueBy: '27 Apr',
    breakdown: [
      { item: 'Pool pump (Hayward 1.5HP)', cost: 4400 },
      { item: 'Installation labour', cost: 1100 },
      { item: 'Plumbing materials', cost: 300 },
    ],
    attachments: ['akwaaba_pools_quote.pdf', 'PM-008_inspection.pdf'],
  },
];

const RECENT_DECISIONS = [
  { id: 'PR-2087', type: 'Purchase Req', subject: 'Office supplies — Q2', amount: 1240, decision: 'approved', approver: 'Jana Kruger', when: '24 Apr 09:14' },
  { id: 'PO-1138', type: 'Purchase Order', subject: 'Marketing — local SEO', amount: 4500, decision: 'approved', approver: 'Jana Kruger', when: '23 Apr 16:08' },
  { id: 'PR-2086', type: 'Purchase Req', subject: 'Imported truffles (special menu)', amount: 12800, decision: 'rejected', approver: 'Jana Kruger', when: '23 Apr 11:22', reason: 'Out of season — request again Q4' },
  { id: 'JV-0455', type: 'Journal', subject: 'Reclassify spa revenue', amount: 8400, decision: 'approved', approver: 'Charles Botha (MD)', when: '22 Apr 14:48' },
  { id: 'PO-1136', type: 'Purchase Order', subject: 'Generator service Q2', amount: 2400, decision: 'approved', approver: 'Jana Kruger', when: '22 Apr 09:55' },
];

const SUPPLIERS = [
  { id: 'SUP-001', name: 'Akosombo Fresh Market', category: 'F&B · Produce', contact: 'Kwame Adusei', phone: '+233 244 553 0012', email: 'kwame@akosombofresh.gh', terms: 'Net 14', rating: 4.8, ytdSpend: 184200, openPOs: 1, location: 'Akosombo, ER', preferred: true },
  { id: 'SUP-002', name: 'Volta Vintners', category: 'F&B · Beverages', contact: 'Selasi Kotoka', phone: '+233 244 891 7720', email: 'orders@voltavintners.com', terms: 'Net 30', rating: 4.6, ytdSpend: 142400, openPOs: 1, location: 'Accra', preferred: true },
  { id: 'SUP-003', name: 'Akwaaba Pools', category: 'Maintenance · Pool', contact: 'Daniel Frimpong', phone: '+233 302 887 2210', email: 'service@akwaabapools.com', terms: 'Net 30', rating: 4.7, ytdSpend: 28400, openPOs: 1, location: 'Tema', preferred: true },
  { id: 'SUP-004', name: 'Tema Linen Supply', category: 'Housekeeping · Linen', contact: 'Patience Ofori', phone: '+233 244 661 8240', email: 'patience@temalinen.com', terms: 'Net 14', rating: 4.5, ytdSpend: 38600, openPOs: 1, location: 'Tema', preferred: true },
  { id: 'SUP-005', name: 'Volta Cooling Ltd', category: 'Maintenance · HVAC', contact: 'Joseph Anokye', phone: '+233 244 220 5510', email: 'service@voltacooling.gh', terms: 'Net 30', rating: 4.9, ytdSpend: 62800, openPOs: 0, location: 'Akosombo, ER', preferred: true },
  { id: 'SUP-006', name: 'Power Solutions GH', category: 'Maintenance · Generator', contact: 'Eric Osei', phone: '+233 302 770 4400', email: 'service@powersolutions.gh', terms: 'Net 30', rating: 4.7, ytdSpend: 48200, openPOs: 0, location: 'Accra', preferred: true },
  { id: 'SUP-007', name: 'Ghana Cleaning Co.', category: 'Housekeeping · Supplies', contact: 'Mavis Osei', phone: '+233 244 998 1120', email: 'orders@ghanacleaning.com', terms: 'Net 14', rating: 4.4, ytdSpend: 21800, openPOs: 0, location: 'Accra', preferred: false },
  { id: 'SUP-008', name: 'Coastal Seafoods', category: 'F&B · Seafood', contact: 'Kofi Mensah (fisherman)', phone: '+233 244 112 4480', email: '—', terms: 'COD', rating: 4.9, ytdSpend: 32400, openPOs: 0, location: 'Tema', preferred: true, note: 'Direct-from-fisherman · 8% saving vs market' },
  { id: 'SUP-009', name: 'Kente Hospitality Wares', category: 'F&B · Tableware', contact: 'Akosua Boateng', phone: '+233 302 660 1100', email: 'sales@kentehospitality.com', terms: 'Net 30', rating: 4.3, ytdSpend: 12400, openPOs: 0, location: 'Accra', preferred: false },
  { id: 'SUP-010', name: 'Solar Taxi GH', category: 'Maintenance · Solar', contact: 'Jorge Appiah', phone: '+233 244 884 2100', email: 'support@solartaxi.com', terms: 'Net 30', rating: 4.8, ytdSpend: 18400, openPOs: 0, location: 'Accra', preferred: true },
];

const PURCHASE_ORDERS = [
  { id: 'PO-1140', supplier: 'Akwaaba Pools', supplierId: 'SUP-003', subject: 'Pool pump replacement (Hayward 1.5HP)', amount: 5800, status: 'awaiting-approval', requester: 'Sipho Dube', dept: 'Maintenance', dateRaised: '23 Apr 2026', expectedDelivery: '28 Apr 2026', linkedTo: 'PM-008', items: [{ desc: 'Hayward 1.5HP pool pump', qty: 1, unit: 'unit', price: 4400 }, { desc: 'Installation labour', qty: 1, unit: 'service', price: 1100 }, { desc: 'Plumbing materials', qty: 1, unit: 'lot', price: 300 }] },
  { id: 'PO-1141', supplier: 'Akosombo Fresh Market', supplierId: 'SUP-001', subject: 'Weekend produce + wine top-up', amount: 8400, status: 'awaiting-approval', requester: 'Chef Olamide', dept: 'Kitchen', dateRaised: '25 Apr 2026', expectedDelivery: '25 Apr 2026 (today)', linkedTo: 'PR-2089', items: [{ desc: 'Lake fish (40kg)', qty: 40, unit: 'kg', price: 45 }, { desc: 'Beef striploin (12kg)', qty: 12, unit: 'kg', price: 160 }, { desc: 'Seasonal vegetables', qty: 1, unit: 'lot', price: 1280 }, { desc: 'Mixed wine case', qty: 12, unit: 'btl', price: 283 }] },
  { id: 'PO-1142', supplier: 'Tema Linen Supply', supplierId: 'SUP-004', subject: 'Linen replacement (12 sets + 8 bathrobes)', amount: 3200, status: 'awaiting-approval', requester: 'Akua Mensah', dept: 'Housekeeping', dateRaised: '24 Apr 2026', expectedDelivery: '02 May 2026', linkedTo: 'PR-2091', items: [{ desc: 'Bath towel sets', qty: 12, unit: 'set', price: 140 }, { desc: 'Bathrobes', qty: 8, unit: 'unit', price: 190 }] },
  { id: 'PO-1138', supplier: 'Akosombo Fresh Market', supplierId: 'SUP-001', subject: 'Daily kitchen produce · Week 17', amount: 6200, status: 'in-transit', requester: 'Chef Olamide', dept: 'Kitchen', dateRaised: '22 Apr 2026', expectedDelivery: '25 Apr 2026 (today)', items: [{ desc: 'Vegetables, herbs, fruit', qty: 1, unit: 'lot', price: 4400 }, { desc: 'Dairy & eggs', qty: 1, unit: 'lot', price: 1800 }] },
  { id: 'PO-1135', supplier: 'Volta Vintners', supplierId: 'SUP-002', subject: 'Q2 wine restock', amount: 18400, status: 'delivered', requester: 'Yaa Owusu', dept: 'F&B', dateRaised: '15 Apr 2026', expectedDelivery: '22 Apr 2026', deliveredOn: '22 Apr 2026', items: [{ desc: 'House red (case)', qty: 12, unit: 'case', price: 1100 }, { desc: 'House white (case)', qty: 8, unit: 'case', price: 950 }, { desc: 'Premium reserves', qty: 1, unit: 'lot', price: 3200 }] },
  { id: 'PO-1130', supplier: 'Volta Cooling Ltd', supplierId: 'SUP-005', subject: 'Quarterly chiller service', amount: 4800, status: 'delivered', requester: 'Sipho Dube', dept: 'Maintenance', dateRaised: '10 Feb 2026', expectedDelivery: '15 Feb 2026', deliveredOn: '15 Feb 2026', items: [{ desc: 'Service labour', qty: 1, unit: 'service', price: 3200 }, { desc: 'Filters & refrigerant', qty: 1, unit: 'lot', price: 1600 }] },
];

const INVENTORY = [
  // Kitchen
  { sku: 'KIT-001', name: 'Lake fish (fillets)', category: 'Kitchen · Fresh', current: 18, par: 40, unit: 'kg', value: 810, supplier: 'Coastal Seafoods', lastRestock: '24 Apr', status: 'low' },
  { sku: 'KIT-002', name: 'Beef striploin', category: 'Kitchen · Fresh', current: 8, par: 12, unit: 'kg', value: 1280, supplier: 'Akosombo Fresh Market', lastRestock: '23 Apr', status: 'ok' },
  { sku: 'KIT-003', name: 'Tilapia (whole)', category: 'Kitchen · Fresh', current: 22, par: 25, unit: 'kg', value: 660, supplier: 'Coastal Seafoods', lastRestock: '24 Apr', status: 'ok' },
  { sku: 'KIT-004', name: 'Jollof rice (raw)', category: 'Kitchen · Dry', current: 48, par: 50, unit: 'kg', value: 384, supplier: 'Akosombo Fresh Market', lastRestock: '20 Apr', status: 'ok' },
  { sku: 'KIT-005', name: 'Banku flour', category: 'Kitchen · Dry', current: 12, par: 30, unit: 'kg', value: 96, supplier: 'Akosombo Fresh Market', lastRestock: '18 Apr', status: 'low' },
  { sku: 'KIT-006', name: 'Plantain', category: 'Kitchen · Fresh', current: 35, par: 40, unit: 'kg', value: 175, supplier: 'Akosombo Fresh Market', lastRestock: '24 Apr', status: 'ok' },
  { sku: 'KIT-007', name: 'Cooking oil (palm)', category: 'Kitchen · Dry', current: 8, par: 20, unit: 'L', value: 240, supplier: 'Akosombo Fresh Market', lastRestock: '15 Apr', status: 'critical' },
  { sku: 'KIT-008', name: 'Goat meat', category: 'Kitchen · Fresh', current: 6, par: 8, unit: 'kg', value: 540, supplier: 'Akosombo Fresh Market', lastRestock: '23 Apr', status: 'ok' },
  // Beverages
  { sku: 'BEV-001', name: 'Star Beer', category: 'Bar · Beer', current: 96, par: 200, unit: 'bottle', value: 1920, supplier: 'Volta Vintners', lastRestock: '22 Apr', status: 'low' },
  { sku: 'BEV-002', name: 'Club Beer', category: 'Bar · Beer', current: 144, par: 200, unit: 'bottle', value: 2880, supplier: 'Volta Vintners', lastRestock: '22 Apr', status: 'ok' },
  { sku: 'BEV-003', name: 'House red wine', category: 'Bar · Wine', current: 88, par: 96, unit: 'bottle', value: 8800, supplier: 'Volta Vintners', lastRestock: '22 Apr', status: 'ok' },
  { sku: 'BEV-004', name: 'House white wine', category: 'Bar · Wine', current: 72, par: 96, unit: 'bottle', value: 6840, supplier: 'Volta Vintners', lastRestock: '22 Apr', status: 'ok' },
  { sku: 'BEV-005', name: 'Sparkling water 500ml', category: 'Bar · Soft', current: 184, par: 240, unit: 'bottle', value: 920, supplier: 'Volta Vintners', lastRestock: '22 Apr', status: 'ok' },
  { sku: 'BEV-006', name: 'Champagne (split)', category: 'Bar · Wine', current: 14, par: 20, unit: 'bottle', value: 3920, supplier: 'Volta Vintners', lastRestock: '22 Apr', status: 'ok' },
  { sku: 'BEV-007', name: 'Hibiscus syrup', category: 'Bar · Mixers', current: 4, par: 12, unit: 'bottle', value: 240, supplier: 'Akosombo Fresh Market', lastRestock: '14 Apr', status: 'critical' },
  // Cleaning
  { sku: 'CLN-001', name: 'Multi-surface cleaner (5L)', category: 'Cleaning', current: 18, par: 24, unit: 'jug', value: 540, supplier: 'Ghana Cleaning Co.', lastRestock: '15 Apr', status: 'ok' },
  { sku: 'CLN-002', name: 'Bleach (5L)', category: 'Cleaning', current: 12, par: 18, unit: 'jug', value: 240, supplier: 'Ghana Cleaning Co.', lastRestock: '15 Apr', status: 'ok' },
  { sku: 'CLN-003', name: 'Pool chlorine (granular)', category: 'Cleaning', current: 14, par: 30, unit: 'kg', value: 700, supplier: 'Akwaaba Pools', lastRestock: '08 Apr', status: 'low' },
];

const RECENT_DELIVERIES = [
  { id: 'GRN-2026-0142', supplier: 'Akosombo Fresh Market', po: 'PO-1138', received: '25 Apr 06:40', receivedBy: 'Chef Olamide', status: 'received-ok', value: 6200 },
  { id: 'GRN-2026-0141', supplier: 'Volta Vintners', po: 'PO-1135', received: '22 Apr 14:20', receivedBy: 'Yaa Owusu', status: 'received-ok', value: 18400 },
  { id: 'GRN-2026-0140', supplier: 'Akosombo Fresh Market', po: 'PO-1132', received: '22 Apr 06:50', receivedBy: 'Chef Olamide', status: 'received-discrepancy', value: 5840, note: '2 fish under-supplied · credit note received' },
  { id: 'GRN-2026-0139', supplier: 'Akosombo Fresh Market', po: 'PO-1128', received: '20 Apr 06:35', receivedBy: 'Chef Olamide', status: 'received-ok', value: 6480 },
];


// MODULES
const GMDashboard = ({ setActiveNav }) => {
  const REV_DEPT = [
    { name: 'Rooms', value: 124000, color: theme.teal },
    { name: 'Restaurant', value: 38000, color: theme.gold },
    { name: 'Bar', value: 18500, color: theme.hibiscus },
    { name: 'Spa & Other', value: 7000, color: theme.dusk },
  ];
  const APPROVALS = [
    { id: 'PR-2089', type: 'Purchase Req', amount: 8400, requester: 'Chef Olamide', subject: 'Weekend produce' },
    { id: 'PR-2091', type: 'Purchase Req', amount: 3200, requester: 'Akua', subject: 'Linen replacement' },
    { id: 'JV-0457', type: 'Journal', amount: 12500, requester: 'Adriaan', subject: 'June accruals' },
    { id: 'PO-1140', type: 'Purchase Order', amount: 5800, requester: 'Sipho', subject: 'Pool pump' },
  ];
  const MAINT = [
    { id: 'WO-340', room: '207', issue: 'AC unit not cooling', priority: 'high', age: '2h' },
    { id: 'WO-339', room: 'Lobby', issue: 'Pendant light flickering', priority: 'low', age: '1d' },
    { id: 'WO-338', room: '112', issue: 'Wardrobe door loose', priority: 'med', age: '1d' },
  ];
  return (
    <div className="p-4 md:p-6 space-y-6" style={{ background: theme.bg, minHeight: '100%' }}>
      <SectionHeader overline="Operational Lead — Today" title="Good morning, Jana"
        action={<Btn variant="primary" icon={ArrowRight} onClick={() => setActiveNav('morning-brief')}>Morning Briefing</Btn>} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard kpi={KPIS_TODAY.occupancy} format="percent" />
        <KpiCard kpi={KPIS_TODAY.adr} format="currency" />
        <KpiCard kpi={KPIS_TODAY.revpar} format="currency" />
        <KpiCard kpi={KPIS_TODAY.fbCost} format="percent" />
        <KpiCard kpi={KPIS_TODAY.revenue} format="currency" />
        <KpiCard kpi={KPIS_TODAY.arrivals} format="number" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card title="Revenue This Week" accent={theme.gold} action={<Pill tone="leaf">+12.3% vs budget</Pill>}>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={WEEK_REV}>
                <defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={theme.gold} stopOpacity={0.35} /><stop offset="100%" stopColor={theme.gold} stopOpacity={0.02} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="2 4" stroke={theme.rule} vertical={false} />
                <XAxis dataKey="day" stroke={theme.inkMute} tick={{ fontSize: 11, fill: theme.inkSoft }} axisLine={false} />
                <YAxis stroke={theme.inkMute} tick={{ fontSize: 11, fill: theme.inkSoft }} axisLine={false} tickFormatter={(v) => '₵' + v / 1000 + 'k'} />
                <Tooltip contentStyle={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }} formatter={(v) => cedi(v)} />
                <Area type="monotone" dataKey="actual" stroke={theme.gold} strokeWidth={2} fill="url(#g2)" name="Actual" />
                <Line type="monotone" dataKey="budget" stroke={theme.teal} strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Budget" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
        <Card title="Revenue by Department" accent={theme.teal}>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={REV_DEPT} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={2}>
                {REV_DEPT.map((e, i) => <Cell key={i} fill={e.color} stroke={theme.bgPanel} strokeWidth={2} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {REV_DEPT.map(d => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: d.color }} /><span style={{ color: theme.inkSoft }}>{d.name}</span></div>
                <span className="font-mono" style={{ color: theme.ink }}>{cedi(d.value)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Pending Approvals" accent={theme.gold} action={<Pill tone="gold">{APPROVALS.length} waiting</Pill>}>
          <div className="space-y-2">
            {APPROVALS.map(a => (
              <div key={a.id} className="flex items-center justify-between p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: theme.ink, fontWeight: 500 }}>{a.id}</span>
                    <Pill tone="neutral">{a.type}</Pill>
                  </div>
                  <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>{a.subject} · {a.requester}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm" style={{ color: theme.ink }}>{cedi(a.amount)}</span>
                  <button className="w-7 h-7 flex items-center justify-center" style={{ background: theme.leaf, color: '#FBF7EE' }}><Check size={14} /></button>
                  <button className="w-7 h-7 flex items-center justify-center" style={{ background: 'transparent', border: `1px solid ${theme.rule}`, color: theme.inkSoft }}><X size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Open Maintenance" accent={theme.clay} action={<Pill tone="clay">2 high priority</Pill>}>
          <div className="space-y-2">
            {MAINT.map(m => (
              <div key={m.id} className="flex items-center justify-between p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                <div>
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: theme.ink, fontWeight: 500 }}>{m.id}</span>
                    <Pill tone={m.priority === 'high' ? 'clay' : m.priority === 'med' ? 'gold' : 'neutral'}>{m.priority}</Pill>
                    <span className="text-xs" style={{ color: theme.inkSoft }}>· {m.room}</span>
                  </div>
                  <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>{m.issue}</div>
                </div>
                <div className="text-xs" style={{ color: theme.inkMute }}>{m.age} ago</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { id: 'arrivals', label: 'Arrivals & Departures', sub: `${ARRIVALS.length} arrivals · ${DEPARTURES.length} departures`, color: theme.dusk },
          { id: 'rooms', label: 'Room Status', sub: '32 rooms · 1 OOO', color: theme.teal },
          { id: 'fb', label: 'F&B Performance', sub: `5 outlets · ${cedi(28450)} today`, color: theme.gold },
        ].map(card => (
          <button key={card.id} onClick={() => setActiveNav(card.id)} className="p-6 text-left transition-all hover:translate-y-[-1px]"
            style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${card.color}` }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase mb-2" style={{ color: card.color, letterSpacing: '0.16em', fontWeight: 700 }}>Module</div>
                <h3 className="font-serif text-xl" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>{card.label}</h3>
                <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{card.sub}</div>
              </div>
              <ChevronRight size={20} style={{ color: card.color }} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// ARRIVALS & DEPARTURES
// ============================================================================
const MorningBriefModule = () => {
  const sections = [
    { id: 'overnight', label: 'Overnight' },
    { id: 'today', label: 'Today' },
    { id: 'priorities', label: 'Priorities' },
    { id: 'team', label: 'Team' },
  ];

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Start of Day · 06:00</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Morning Brief</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Saturday, 25 April 2026 · Everything Jana needs before stepping onto the floor</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="ghost" icon={Printer}>Print</Btn>
            <Btn variant="primary" icon={Download}>Download Brief</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-6 md:space-y-8">

        {/* Greeting + weather */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-2 p-6" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.gold}` }}>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>Akwaaba</div>
            <div className="font-serif" style={{ fontSize: '26px', color: theme.ink, letterSpacing: '-0.01em', lineHeight: 1.2 }}>Good morning, Jana</div>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: theme.inkSoft }}>
              Strong weekend ahead — 14 arrivals today including the Asante–Mensah wedding party (8 guests), Anneke Visser (anniversary VIP),
              and the Reyes family already in. F&B is forecast at +30% vs yesterday with Saturday dinner rush.
              Two things need your attention: WO-340 in Room 207 still OOO and 4 approvals waiting in your queue.
            </p>
          </div>
          <div className="p-6" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.teal}` }}>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.teal, letterSpacing: '0.18em', fontWeight: 700 }}>Lake Volta · Today</div>
            <div className="font-serif" style={{ fontSize: '40px', color: theme.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>32°</div>
            <div className="text-sm" style={{ color: theme.inkSoft }}>Sunny · Light SW breeze · Calm water</div>
            <div className="mt-3 pt-3 grid grid-cols-2 gap-2 text-xs" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
              <div>
                <div style={{ color: theme.inkMute }}>Sunrise</div>
                <div style={{ color: theme.ink, fontWeight: 500 }}>05:54</div>
              </div>
              <div>
                <div style={{ color: theme.inkMute }}>Sunset</div>
                <div style={{ color: theme.ink, fontWeight: 500 }}>18:12</div>
              </div>
              <div>
                <div style={{ color: theme.inkMute }}>Ferry · 14:00</div>
                <div style={{ color: theme.leaf, fontWeight: 500 }}>On time</div>
              </div>
              <div>
                <div style={{ color: theme.inkMute }}>ECG</div>
                <div style={{ color: theme.leaf, fontWeight: 500 }}>Stable</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Overnight */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: theme.duskSoft, color: theme.dusk }}>
              <Moon size={16} />
            </div>
            <h2 className="font-serif" style={{ fontSize: '22px', color: theme.ink, letterSpacing: '-0.01em' }}>While you were away</h2>
            <div className="flex-1 h-px" style={{ background: theme.rule }} />
            <span className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.16em', fontWeight: 600 }}>Overnight 21:00 → 06:00</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.leaf}` }}>
              <div className="flex items-center gap-2 mb-2">
                <CircleCheck size={14} style={{ color: theme.leaf }} />
                <span className="text-[10px] uppercase" style={{ color: theme.leaf, letterSpacing: '0.16em', fontWeight: 700 }}>Night Audit</span>
              </div>
              <div className="font-serif text-lg" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Completed at 03:02</div>
              <p className="text-xs mt-1" style={{ color: theme.inkSoft }}>20 min runtime · Cashier variance ₵+24 (immaterial) · 1 no-show charge applied</p>
              <button className="text-[11px] mt-2 underline" style={{ color: theme.gold }}>View pack →</button>
            </div>
            <div className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.gold}` }}>
              <div className="flex items-center gap-2 mb-2">
                <Ban size={14} style={{ color: theme.gold }} />
                <span className="text-[10px] uppercase" style={{ color: theme.gold, letterSpacing: '0.16em', fontWeight: 700 }}>1 No-show</span>
              </div>
              <div className="font-serif text-lg" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>David Chen (R1049)</div>
              <p className="text-xs mt-1" style={{ color: theme.inkSoft }}>Booking.com · ₵1,240 charge auto-applied per OTA terms</p>
              <button className="text-[11px] mt-2 underline" style={{ color: theme.gold }}>Review →</button>
            </div>
            <div className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.teal}` }}>
              <div className="flex items-center gap-2 mb-2">
                <Activity size={14} style={{ color: theme.teal }} />
                <span className="text-[10px] uppercase" style={{ color: theme.teal, letterSpacing: '0.16em', fontWeight: 700 }}>Yesterday's Result</span>
              </div>
              <div className="font-serif text-lg" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>{cedi(187500)} revenue</div>
              <p className="text-xs mt-1" style={{ color: theme.inkSoft }}>87.5% occupancy · ADR {cedi(1840)} · +12.3% vs budget</p>
              <button className="text-[11px] mt-2 underline" style={{ color: theme.gold }}>Manager flash →</button>
            </div>
          </div>
        </div>

        {/* Section: Today's picture */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: theme.goldSoft, color: theme.gold }}>
              <CalendarDays size={16} />
            </div>
            <h2 className="font-serif" style={{ fontSize: '22px', color: theme.ink, letterSpacing: '-0.01em' }}>Today's picture</h2>
            <div className="flex-1 h-px" style={{ background: theme.rule }} />
          </div>
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
              <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Forecast Occupancy</div>
              <div className="font-serif text-3xl" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>92%</div>
              <div className="text-xs mt-1" style={{ color: theme.leaf }}>+5pp vs yesterday</div>
            </div>
            <div className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
              <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Arrivals · VIPs</div>
              <div className="font-serif text-3xl" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>14 <span style={{ fontSize: '14px', color: theme.gold }}>· 4 VIP</span></div>
              <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>incl. wedding party</div>
            </div>
            <div className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
              <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Departures</div>
              <div className="font-serif text-3xl" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>6</div>
              <div className="text-xs mt-1" style={{ color: theme.gold }}>2 awaiting payment</div>
            </div>
            <div className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
              <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>F&B Forecast</div>
              <div className="font-serif text-3xl" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>{cedi(36500)}</div>
              <div className="text-xs mt-1" style={{ color: theme.leaf }}>+28% vs yesterday</div>
            </div>
          </div>

          <Card title="VIP Arrivals · Personal Greeting Recommended" accent={theme.gold} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>ETA</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Guest</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Room</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Reason</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Special prep</th>
                </tr>
              </thead>
              <tbody>
                {ARRIVALS.filter(a => a.vip).map((a, i, arr) => (
                  <tr key={a.id} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5 font-mono" style={{ color: theme.ink, fontWeight: 500 }}>{a.eta}</td>
                    <td className="py-3 px-3">
                      <div style={{ color: theme.ink, fontWeight: 500 }}>{a.guest}</div>
                      <div className="text-[11px]" style={{ color: theme.inkMute }}>{a.nationality}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-mono" style={{ color: theme.ink }}>{a.room || 'TBD'}</div>
                      <div className="text-[11px]" style={{ color: theme.inkMute }}>{a.type}</div>
                    </td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>
                      {a.id === 'R1041' && 'Anniversary'}
                      {a.id === 'R1043' && 'Already in-house · honeymoon turn-down'}
                    </td>
                    <td className="py-3 px-3 text-xs italic" style={{ color: theme.inkSoft }}>{a.special}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Section: Alerts & priorities */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: theme.claySoft, color: theme.clay }}>
              <AlertTriangle size={16} />
            </div>
            <h2 className="font-serif" style={{ fontSize: '22px', color: theme.ink, letterSpacing: '-0.01em' }}>Needs your attention</h2>
            <div className="flex-1 h-px" style={{ background: theme.rule }} />
          </div>
          <div className="space-y-2">
            {[
              { tone: 'clay', icon: Wrench, title: 'Room 207 still OOO', desc: 'WO-340 — AC unit not cooling. Sipho on it. ETA tomorrow. 1 anniversary VIP arrival could need re-rooming if it slips.', action: 'View work order', target: 'maintenance' },
              { tone: 'gold', icon: ClipboardList, title: '4 approvals waiting', desc: 'Pool pump (₵5,800), weekend produce (₵8,400), linen (₵3,200), June accruals (₵12,500). Chef needs the produce by 14:00.', action: 'Open approvals queue', target: 'approvals' },
              { tone: 'clay', icon: TrendingDown, title: 'F&B Cost % running 12% over', desc: 'MTD cost of sales unfavorable by ₵40k. Direct-from-fisherman supplier conversation pending — discuss with Yaa today.', action: 'F&B performance', target: 'fb' },
              { tone: 'gold', icon: Bath, title: 'Slippers critical · 14 of 80 par', desc: 'HK linen reorder needed within 48h. Tema Linen Supply quote ready in approvals queue.', action: 'View linen status', target: 'rooms' },
            ].map((a, i) => {
              const Icon = a.icon;
              const tones = { clay: { color: theme.clay, bg: theme.claySoft }, gold: { color: theme.gold, bg: theme.goldSoft } };
              const t = tones[a.tone];
              return (
                <div key={i} className="p-4 flex items-start gap-3 transition-all"
                  style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${t.color}` }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: t.bg, color: t.color }}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-serif" style={{ fontSize: '17px', color: theme.ink, letterSpacing: '-0.01em' }}>{a.title}</div>
                    <p className="text-xs mt-1" style={{ color: theme.inkSoft }}>{a.desc}</p>
                  </div>
                  <Btn variant="secondary" size="sm" icon={ArrowRight}>{a.action}</Btn>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Today's people on duty */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: theme.tealSoft, color: theme.teal }}>
              <Users size={16} />
            </div>
            <h2 className="font-serif" style={{ fontSize: '22px', color: theme.ink, letterSpacing: '-0.01em' }}>On duty today</h2>
            <div className="flex-1 h-px" style={{ background: theme.rule }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { dept: 'Front Office', lead: 'Amani Mlangeni', staff: 'Amani M. (08-16) → Kwame A. (16-00) → Esi O. (00-08)' },
              { dept: 'Housekeeping', lead: 'Akua Mensah', staff: '4 attendants · 14 arrivals + 6 departures' },
              { dept: 'Kitchen', lead: 'Chef Olamide', staff: '6 in kitchen · weekend rush staffing' },
              { dept: 'Maintenance', lead: 'Sipho Dube', staff: 'On WO-340 (Room 207 AC) until done' },
            ].map(d => (
              <div key={d.dept} className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
                <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.16em', fontWeight: 700 }}>{d.dept}</div>
                <div className="text-sm font-medium mb-1" style={{ color: theme.ink }}>{d.lead}</div>
                <div className="text-xs" style={{ color: theme.inkSoft }}>{d.staff}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer call-to-action */}
        <div className="p-6 flex items-center justify-between" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderTop: `3px solid ${theme.gold}` }}>
          <div>
            <div className="text-[10px] uppercase mb-1" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>You're set for the day</div>
            <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>Three things to do before 09:00</div>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Approve weekend produce · Walk Floor 2 (check 207) · Greet Anneke at 14:30</div>
          </div>
          <Btn variant="primary" icon={ArrowRight}>Open Dashboard</Btn>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// HR & PAYROLL
// ============================================================================
const ArrivalsModule = () => {
  const [tab, setTab] = useState('arrivals');
  const [checkInGuest, setCheckInGuest] = useState(null);
  const [folioGuest, setFolioGuest] = useState(null);
  const tabs = [
    { id: 'arrivals', label: 'Arrivals', icon: ArrowDownRight },
    { id: 'departures', label: 'Departures', icon: ArrowUpRight },
    { id: 'walkin', label: 'Walk-In', icon: Plus },
    { id: 'noshow', label: 'No-Shows', icon: Ban },
    { id: 'groups', label: 'Groups', icon: Users },
  ];
  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Front Desk</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Arrivals & Departures</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Saturday, 25 April 2026 · Today&apos;s movements</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="ghost" icon={RefreshCw}>Refresh</Btn>
            <Btn variant="primary" icon={Download}>Export A4</Btn>
          </div>
        </div>
        <div className="px-4 md:px-8 flex gap-1 overflow-x-auto" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
          {tabs.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className="flex items-center gap-2 px-3 md:px-4 py-3 text-sm transition-all whitespace-nowrap"
                style={{ color: active ? theme.ink : theme.inkSoft, fontWeight: active ? 600 : 400, borderBottom: active ? `2px solid ${theme.gold}` : '2px solid transparent', marginBottom: '-1px' }}>
                <Icon size={14} />{t.label}
              </button>
            );
          })}
        </div>
      </div>
      {tab === 'arrivals' && <ArrivalsTab onCheckIn={setCheckInGuest} />}
      {tab === 'departures' && <DeparturesTab onFolio={setFolioGuest} />}
      {tab === 'walkin' && <WalkInTab onCheckIn={setCheckInGuest} />}
      {tab === 'noshow' && <NoShowTab />}
      {tab === 'groups' && <GroupsTab />}
      {checkInGuest && <CheckInModal arrival={checkInGuest} onClose={() => setCheckInGuest(null)} />}
      {folioGuest && <FolioModal guest={folioGuest} onClose={() => setFolioGuest(null)} />}
    </div>
  );
};

const ArrivalsTab = ({ onCheckIn }) => {
  const stats = {
    total: ARRIVALS.length,
    arrived: ARRIVALS.filter(a => a.status === 'arrived').length,
    expected: ARRIVALS.filter(a => a.status === 'expected').length,
    unassigned: ARRIVALS.filter(a => !a.room).length,
    vip: ARRIVALS.filter(a => a.vip).length,
  };
  return (
    <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <KpiTile label="Expected Today" value={stats.total} sublabel={`${stats.arrived} arrived`} icon={CalendarDays} />
        <KpiTile label="Still Expected" value={stats.expected} sublabel="awaiting check-in" icon={Clock3} tone={theme.dusk} />
        <KpiTile label="Unassigned" value={stats.unassigned} sublabel="rooms not allocated" icon={AlertTriangle} tone={theme.gold} />
        <KpiTile label="VIP Arrivals" value={stats.vip} sublabel="anniversary, repeat" icon={Star} tone={theme.gold} />
        <KpiTile label="Groups" value={1} sublabel="Asante Wedding" icon={Users} tone={theme.teal} />
      </div>
      <div className="space-y-3">
        {ARRIVALS.map(a => {
          const isVIP = a.vip;
          const isArrived = a.status === 'arrived';
          const isNoShow = a.status === 'no-show';
          return (
            <div key={a.id} className="grid grid-cols-12 gap-4 p-4"
              style={{
                background: isVIP ? theme.goldSoft + '60' : theme.bgPanel,
                border: `1px solid ${isVIP ? theme.gold + '40' : theme.rule}`,
                borderLeft: `3px solid ${isNoShow ? theme.clay : isArrived ? theme.leaf : isVIP ? theme.gold : theme.teal}`,
              }}>
              <div className="col-span-1">
                <div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>ETA</div>
                <div className="font-serif text-2xl" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>{a.eta}</div>
                <div className="font-mono text-[10px] mt-1" style={{ color: theme.inkMute }}>{a.id}</div>
              </div>
              <div className="col-span-3 border-l pl-4" style={{ borderColor: theme.ruleSoft }}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>{a.guest}</span>
                  {isVIP && <Pill tone="gold" size="sm"><Sparkles size={9} /> VIP</Pill>}
                  {a.group && <Pill tone="teal" size="sm"><Users size={9} /> Group</Pill>}
                </div>
                <div className="text-xs mt-1 flex items-center gap-2" style={{ color: theme.inkSoft }}>
                  <Globe size={11} /> {a.nationality} · {a.nights} nights
                </div>
                {a.special && (
                  <div className="text-xs mt-1.5 italic flex items-start gap-1" style={{ color: theme.inkSoft }}>
                    <PenLine size={10} className="mt-0.5" style={{ color: theme.gold }} />
                    <span>{a.special}</span>
                  </div>
                )}
              </div>
              <div className="col-span-2 border-l pl-4" style={{ borderColor: theme.ruleSoft }}>
                <div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Room</div>
                {a.room ? (
                  <>
                    <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.02em' }}>{a.room}</div>
                    <div className="text-xs" style={{ color: theme.inkSoft }}>{a.type}</div>
                  </>
                ) : (
                  <>
                    <div className="font-serif" style={{ fontSize: '16px', color: theme.gold }}>Unassigned</div>
                    <div className="text-xs" style={{ color: theme.inkSoft }}>{a.type}</div>
                    <button className="text-[11px] mt-1 underline" style={{ color: theme.gold }}>Auto-assign</button>
                  </>
                )}
              </div>
              <div className="col-span-2 border-l pl-4" style={{ borderColor: theme.ruleSoft }}>
                <div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Source · Total</div>
                <div className="text-sm" style={{ color: theme.ink }}>{a.source}</div>
                <div className="font-serif" style={{ fontSize: '17px', color: theme.ink }}>{cedi(a.rate * a.nights)}</div>
                {a.depositPaid > 0 && <div className="text-[11px]" style={{ color: theme.leaf }}>Deposit {cedi(a.depositPaid)}</div>}
              </div>
              <div className="col-span-2 border-l pl-4" style={{ borderColor: theme.ruleSoft }}>
                <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Pre-arrival</div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center gap-1" style={{ color: theme.leaf }}><CircleCheck size={11} />Reservation confirmed</div>
                  <div className="flex items-center gap-1" style={{ color: a.depositPaid > 0 ? theme.leaf : theme.inkMute }}>
                    {a.depositPaid > 0 ? <CircleCheck size={11} /> : <CircleAlert size={11} />}
                    {a.depositPaid > 0 ? 'Deposit paid' : 'No deposit'}
                  </div>
                  <div className="flex items-center gap-1" style={{ color: a.room ? theme.leaf : theme.gold }}>
                    {a.room ? <CircleCheck size={11} /> : <Clock3 size={11} />}
                    {a.room ? 'Room assigned' : 'Awaiting room'}
                  </div>
                  <div className="flex items-center gap-1" style={{ color: theme.gold }}><Clock3 size={11} />ID at check-in</div>
                </div>
              </div>
              <div className="col-span-2 border-l pl-4 flex flex-col items-end justify-between gap-2" style={{ borderColor: theme.ruleSoft }}>
                {isArrived ? <Pill tone="leaf"><Check size={10} /> Checked in</Pill>
                  : isNoShow ? <Pill tone="clay"><Ban size={10} /> No-show</Pill>
                  : <Pill tone="dusk"><Clock3 size={10} /> Expected</Pill>}
                {!isArrived && !isNoShow && <Btn variant="primary" size="sm" onClick={() => onCheckIn(a)}>Check In</Btn>}
                {isArrived && <Btn variant="secondary" size="sm" icon={Eye}>View Folio</Btn>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DeparturesTab = ({ onFolio }) => {
  const stats = {
    total: DEPARTURES.length,
    departed: DEPARTURES.filter(d => d.status === 'departed').length,
    pending: DEPARTURES.filter(d => d.status === 'pending-payment').length,
    outstanding: DEPARTURES.reduce((s, d) => s + d.folioBalance, 0),
  };
  return (
    <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile label="Departures Today" value={stats.total} sublabel={`${stats.departed} departed`} icon={CalendarDays} />
        <KpiTile label="Awaiting Payment" value={stats.pending} sublabel={cedi(stats.outstanding) + ' open'} icon={DollarSign} tone={theme.clay} />
        <KpiTile label="Ready" value={1} sublabel="folios settled" icon={CircleCheck} tone={theme.leaf} />
        <KpiTile label="Late Check-out" value={1} sublabel="approved" icon={Clock3} tone={theme.gold} />
      </div>
      <Card title="Departures · Saturday, 25 April 2026" accent={theme.teal} padded={false}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
              <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>ETO</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Guest</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Room</th>
              <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Total</th>
              <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Balance</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
              <th className="text-right py-3 px-5"></th>
            </tr>
          </thead>
          <tbody>
            {DEPARTURES.map((d, i) => {
              const tone = d.status === 'departed' ? 'neutral' : d.status === 'pending-payment' ? 'clay' : d.status === 'late-checkout' ? 'gold' : 'leaf';
              const label = d.status === 'departed' ? 'Departed' : d.status === 'pending-payment' ? 'Awaiting payment' : d.status === 'late-checkout' ? 'Late check-out' : 'Ready';
              return (
                <tr key={d.id} style={{ borderBottom: i < DEPARTURES.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none', opacity: d.status === 'departed' ? 0.6 : 1 }}>
                  <td className="py-4 px-5">
                    <div className="font-serif text-lg" style={{ color: theme.ink }}>{d.eto}</div>
                    <div className="font-mono text-[10px]" style={{ color: theme.inkMute }}>{d.id}</div>
                  </td>
                  <td className="py-4 px-3">
                    <div style={{ color: theme.ink, fontWeight: 500 }}>{d.guest}</div>
                    <div className="text-xs" style={{ color: theme.inkMute }}>{d.nationality} · {d.nights} nights</div>
                    {d.note && <div className="text-[11px] mt-0.5 italic" style={{ color: theme.gold }}><AlertCircle size={9} className="inline mr-1" />{d.note}</div>}
                  </td>
                  <td className="py-4 px-3">
                    <div className="font-mono" style={{ color: theme.ink, fontWeight: 500 }}>{d.room}</div>
                    <div className="text-xs" style={{ color: theme.inkMute }}>{d.type}</div>
                  </td>
                  <td className="py-4 px-3 text-right font-serif" style={{ color: theme.ink, fontSize: '15px' }}>{cedi(d.total)}</td>
                  <td className="py-4 px-3 text-right">
                    {d.folioBalance > 0
                      ? <span className="font-serif" style={{ color: theme.clay, fontWeight: 600, fontSize: '15px' }}>{cedi(d.folioBalance)}</span>
                      : <span className="font-mono text-sm" style={{ color: theme.leaf }}>₵ 0</span>}
                  </td>
                  <td className="py-4 px-3">
                    <Pill tone={tone} size="sm">{label}</Pill>
                    <div className="text-[11px] mt-1" style={{ color: theme.inkSoft }}>{d.paymentMethod}</div>
                  </td>
                  <td className="py-4 px-5 text-right">
                    {d.status === 'pending-payment' && <Btn variant="primary" size="sm" icon={CreditCard} onClick={() => onFolio(d)}>Settle</Btn>}
                    {d.status === 'ready' && <Btn variant="primary" size="sm" onClick={() => onFolio(d)}>Check Out</Btn>}
                    {(d.status === 'late-checkout' || d.status === 'departed') && <Btn variant="ghost" size="sm" icon={Eye} onClick={() => onFolio(d)}>Folio</Btn>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const WalkInTab = ({ onCheckIn }) => (
  <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <KpiTile label="Walk-ins Today" value={2} sublabel="2 converted" icon={UserCircle} tone={theme.gold} />
      <KpiTile label="Conversion Rate" value="100%" sublabel="enquiries to bookings" icon={BadgeCheck} tone={theme.leaf} />
      <KpiTile label="Walk-in Revenue" value={cedi(3460)} sublabel="today, taxes inclusive" icon={DollarSign} />
    </div>
    <Card title="Register a Walk-In Guest" accent={theme.gold}>
      <p className="text-sm mb-5" style={{ color: theme.inkSoft }}>A guest at the desk without a reservation. Capture details, check availability, assign a room, take payment — all in one flow.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="text-[10px] uppercase mb-3" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>Stay</div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute }}>Check-in</div><div className="px-3 py-2" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink }}>25 Apr 2026</div></div>
            <div><div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute }}>Check-out</div><div className="px-3 py-2" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink }}>26 Apr 2026</div></div>
            <div><div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute }}>Adults</div><div className="px-3 py-2" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink }}>1</div></div>
            <div><div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute }}>Children</div><div className="px-3 py-2" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink }}>0</div></div>
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase mb-3" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>Available rooms</div>
          <div className="space-y-2">
            {[
              { type: 'Standard', count: 3, rate: 980, color: theme.teal },
              { type: 'Garden Room', count: 2, rate: 1240, color: theme.leaf },
              { type: 'Deluxe', count: 4, rate: 1650, color: theme.dusk },
              { type: 'Lakeview Suite', count: 1, rate: 2840, color: theme.gold },
            ].map(r => (
              <button key={r.type} className="w-full p-3 flex items-center justify-between"
                style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}`, borderLeft: `3px solid ${r.color}` }}>
                <div className="text-left">
                  <div className="font-serif text-base" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>{r.type}</div>
                  <div className="text-xs" style={{ color: theme.inkSoft }}>{r.count} available</div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-lg" style={{ color: theme.ink }}>{cedi(r.rate)}</div>
                  <div className="text-[10px]" style={{ color: theme.inkMute }}>per night</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Btn variant="primary" icon={ArrowRight} onClick={() => onCheckIn({ id: 'WI-NEW', guest: 'New Walk-In', room: '102', type: 'Standard', nights: 1, rate: 980, vip: false, source: 'Walk-in', confirmed: true, depositPaid: 0, special: '', nationality: '' })}>Continue to Check-In</Btn>
      </div>
    </Card>
  </div>
);

const NoShowTab = () => {
  const noShows = [
    { id: 'R1049', guest: 'David Chen', date: '25 Apr', source: 'Booking.com', charge: 1240, status: 'pending' },
    { id: 'R1029', guest: 'Mark Robinson', date: '24 Apr', source: 'Expedia', charge: 980, status: 'charged' },
    { id: 'R1023', guest: 'Linda Patel', date: '23 Apr', source: 'Direct', charge: 0, status: 'waived', reason: 'Repeat guest — flight cancelled' },
    { id: 'R1018', guest: 'Henrik Olsen', date: '22 Apr', source: 'Booking.com', charge: 1240, status: 'charged' },
  ];
  return (
    <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile label="No-shows · Today" value={1} sublabel="auto-flagged" icon={Ban} tone={theme.clay} />
        <KpiTile label="No-show Rate · MTD" value="2.1%" sublabel="of confirmed" icon={AlertTriangle} tone={theme.gold} />
        <KpiTile label="Charges Applied" value={cedi(3460)} sublabel="MTD recovered" icon={DollarSign} tone={theme.leaf} />
        <KpiTile label="Charges Waived" value={cedi(980)} sublabel="MTD" icon={Heart} tone={theme.dusk} />
      </div>
      <Card title="No-Show Log" accent={theme.clay} padded={false}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
              <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Date</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Guest</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Source</th>
              <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Charge</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
              <th className="text-right py-3 px-5"></th>
            </tr>
          </thead>
          <tbody>
            {noShows.map((n, i) => {
              const tone = n.status === 'pending' ? 'gold' : n.status === 'charged' ? 'clay' : 'dusk';
              return (
                <tr key={n.id} style={{ borderBottom: i < noShows.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5">
                    <div style={{ color: theme.ink }}>{n.date}</div>
                    <div className="font-mono text-[10px]" style={{ color: theme.inkMute }}>{n.id}</div>
                  </td>
                  <td className="py-3 px-3" style={{ color: theme.ink }}>{n.guest}</td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{n.source}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: n.charge > 0 ? theme.clay : theme.inkMute, fontWeight: 600 }}>{n.charge > 0 ? cedi(n.charge) : '—'}</td>
                  <td className="py-3 px-3">
                    <Pill tone={tone} size="sm">{n.status}</Pill>
                    {n.reason && <div className="text-[11px] mt-1 italic" style={{ color: theme.inkSoft }}>{n.reason}</div>}
                  </td>
                  <td className="py-3 px-5 text-right">
                    {n.status === 'pending'
                      ? <div className="flex justify-end gap-2"><Btn variant="ghost" size="sm">Waive</Btn><Btn variant="primary" size="sm">Apply</Btn></div>
                      : <Btn variant="ghost" size="sm" icon={Eye}>View</Btn>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const GroupsTab = () => {
  const groups = [
    { id: 'GRP-2026-0014', name: 'Asante–Mensah Wedding Party', arrival: '25 Apr', departure: '27 Apr', rooms: 4, guests: 8, contact: 'Mrs. Yaa Asante', total: 13200, status: 'arriving-today' },
    { id: 'GRP-2026-0015', name: 'GIPC Quarterly Conference', arrival: '08 May', departure: '10 May', rooms: 12, guests: 24, contact: 'Daniel Ofori', total: 39600, status: 'confirmed' },
    { id: 'GRP-2026-0011', name: 'Volta Yacht Club', arrival: '12 May', departure: '14 May', rooms: 6, guests: 12, contact: 'Capt. James Sallah', total: 19800, status: 'tentative' },
  ];
  return (
    <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiTile label="Group Arrivals Today" value={1} sublabel="8 guests, 4 rooms" icon={Users} tone={theme.teal} />
        <KpiTile label="Confirmed · 30d" value={2} sublabel={cedi(52800) + ' value'} icon={CalendarDays} />
        <KpiTile label="Tentative" value={1} sublabel="awaiting follow-up" icon={Clock3} tone={theme.gold} />
      </div>
      <Card title="Group Bookings & Blocks" accent={theme.teal} action={<Btn variant="primary" size="sm" icon={Plus}>New Group Block</Btn>}>
        <div className="space-y-3">
          {groups.map(g => {
            const tone = g.status === 'arriving-today' ? 'gold' : g.status === 'confirmed' ? 'leaf' : 'dusk';
            const label = g.status === 'arriving-today' ? 'Arriving today' : g.status === 'confirmed' ? 'Confirmed' : 'Tentative';
            return (
              <div key={g.id} className="p-4 grid grid-cols-12 gap-4 items-center"
                style={{ background: g.status === 'arriving-today' ? theme.goldSoft + '40' : theme.bg, border: `1px solid ${theme.ruleSoft}`, borderLeft: `3px solid ${g.status === 'arriving-today' ? theme.gold : g.status === 'confirmed' ? theme.leaf : theme.dusk}` }}>
                <div className="col-span-4">
                  <div className="font-mono text-[10px]" style={{ color: theme.inkMute }}>{g.id}</div>
                  <div className="font-serif text-lg mt-0.5" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>{g.name}</div>
                  <div className="text-xs mt-1" style={{ color: theme.inkSoft }}><UserCircle size={10} className="inline mr-1" />{g.contact}</div>
                </div>
                <div className="col-span-3"><div className="text-[10px] uppercase" style={{ color: theme.inkMute }}>Stay</div><div className="text-sm" style={{ color: theme.ink }}>{g.arrival} → {g.departure}</div></div>
                <div className="col-span-1 text-center"><div className="font-serif text-xl" style={{ color: theme.ink }}>{g.rooms}</div><div className="text-[10px]" style={{ color: theme.inkMute }}>rooms</div></div>
                <div className="col-span-1 text-center"><div className="font-serif text-xl" style={{ color: theme.ink }}>{g.guests}</div><div className="text-[10px]" style={{ color: theme.inkMute }}>guests</div></div>
                <div className="col-span-2 text-right"><div className="font-serif text-lg" style={{ color: theme.gold }}>{cedi(g.total)}</div><Pill tone={tone} size="sm">{label}</Pill></div>
                <div className="col-span-1 flex justify-end"><Btn variant="secondary" size="sm" icon={Eye}>Open</Btn></div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

const CheckInModal = ({ arrival, onClose }) => {
  const [step, setStep] = useState(1);
  const totalCost = arrival.rate * arrival.nights;
  const tax = Math.round(totalCost * 0.15);
  const total = totalCost + tax - (arrival.depositPaid || 0);
  const steps = ['Welcome', 'Guest details', 'Room & rate', 'Payment', 'Complete'];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8" style={{ background: 'rgba(21,32,31,0.5)' }} onClick={onClose}>
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }} onClick={(e) => e.stopPropagation()}>
        <div className="px-7 py-5" style={{ background: arrival.vip ? theme.goldSoft : theme.bgPanelAlt, borderBottom: `1px solid ${theme.rule}` }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] uppercase" style={{ color: theme.gold, letterSpacing: '0.2em', fontWeight: 700 }}>Check-In · {arrival.id}</div>
              <div className="font-serif mt-1 flex items-center gap-3" style={{ fontSize: '28px', color: theme.ink, letterSpacing: '-0.02em' }}>
                {arrival.guest}
                {arrival.vip && <Pill tone="gold"><Sparkles size={10} /> VIP</Pill>}
              </div>
              <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{arrival.nights} nights · {arrival.type}</div>
            </div>
            <button onClick={onClose} className="p-1.5"><X size={20} style={{ color: theme.inkSoft }} /></button>
          </div>
        </div>
        <div className="px-7 py-4 flex items-center gap-2" style={{ background: theme.bg, borderBottom: `1px solid ${theme.rule}` }}>
          {steps.map((s, i) => {
            const isPast = step > i + 1;
            const isCurrent = step === i + 1;
            return (
              <React.Fragment key={s}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center text-xs font-bold"
                    style={{ background: isPast ? theme.leaf : isCurrent ? theme.gold : theme.ruleSoft, color: isPast || isCurrent ? '#FBF7EE' : theme.inkMute }}>
                    {isPast ? <Check size={11} /> : i + 1}
                  </div>
                  <span className="text-[10px] uppercase" style={{ color: isCurrent ? theme.ink : theme.inkMute, fontWeight: isCurrent ? 700 : 500, letterSpacing: '0.1em' }}>{s}</span>
                </div>
                {i < steps.length - 1 && <div className="flex-1 h-px" style={{ background: theme.rule }} />}
              </React.Fragment>
            );
          })}
        </div>
        <div className="flex-1 overflow-y-auto p-7">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-serif" style={{ fontSize: '22px', color: theme.ink, letterSpacing: '-0.01em' }}>Welcome to The Float, {arrival.guest.split(' ')[0]}</h3>
              <p className="text-sm" style={{ color: theme.inkSoft }}>Quickly review the reservation, confirm guest details, and complete check-in.</p>
              {arrival.special && (
                <div className="p-3" style={{ background: theme.goldSoft + '50', border: `1px solid ${theme.gold + '40'}`, borderLeft: `3px solid ${theme.gold}` }}>
                  <div className="text-[10px] uppercase mb-1" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>Special note</div>
                  <div className="text-sm" style={{ color: theme.ink }}>{arrival.special}</div>
                </div>
              )}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-serif" style={{ fontSize: '20px', color: theme.ink }}>Guest details & ID</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {[['Full name', arrival.guest], ['Reservation', arrival.id], ['Nationality', arrival.nationality || '—'], ['Source', arrival.source], ['Passport / ID', 'Scan or type'], ['ID expiry', 'DD/MM/YYYY']].map(([l, v]) => (
                  <div key={l}>
                    <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>{l}</div>
                    <div className="px-3 py-2 text-sm" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <button className="flex flex-col items-center gap-2 p-4" style={{ border: `1px dashed ${theme.gold}`, color: theme.gold }}>
                  <Camera size={20} /><div className="text-sm font-medium">Scan Passport / ID</div>
                </button>
                <button className="flex flex-col items-center gap-2 p-4" style={{ border: `1px dashed ${theme.teal}`, color: theme.teal }}>
                  <FileSignature size={20} /><div className="text-sm font-medium">Digital Reg Card</div>
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-serif" style={{ fontSize: '20px', color: theme.ink }}>Room & rate</h3>
              <div className="p-5" style={{ background: theme.bgPanelAlt, border: `1px solid ${theme.rule}` }}>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span style={{ color: theme.inkSoft }}>Room ({arrival.nights} × {cedi(arrival.rate)})</span><span className="font-mono" style={{ color: theme.ink }}>{cedi(totalCost)}</span></div>
                  <div className="flex justify-between"><span style={{ color: theme.inkSoft }}>VAT + Tourism Levy (15%)</span><span className="font-mono" style={{ color: theme.ink }}>{cedi(tax)}</span></div>
                  {arrival.depositPaid > 0 && <div className="flex justify-between"><span style={{ color: theme.leaf }}>Less: Deposit</span><span className="font-mono" style={{ color: theme.leaf }}>− {cedi(arrival.depositPaid)}</span></div>}
                  <div className="flex justify-between items-baseline pt-3" style={{ borderTop: `1px solid ${theme.rule}` }}>
                    <span className="font-serif text-base" style={{ color: theme.ink }}>Balance due</span>
                    <span className="font-serif" style={{ fontSize: '24px', color: theme.gold, letterSpacing: '-0.02em' }}>{cedi(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-serif" style={{ fontSize: '20px', color: theme.ink }}>Payment</h3>
              <div className="p-4" style={{ background: theme.bgPanelAlt, border: `1px solid ${theme.rule}` }}>
                <div className="text-[10px] uppercase" style={{ color: theme.inkMute }}>Amount due</div>
                <div className="font-serif" style={{ fontSize: '28px', color: theme.gold, letterSpacing: '-0.02em' }}>{cedi(total)}</div>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Credit card on file', detail: 'Visa •••• 4221', icon: CreditCard, def: true },
                  { label: 'Mobile Money', detail: 'MTN MoMo · Vodafone Cash · AirtelTigo', icon: Phone },
                  { label: 'Cash', detail: 'GHS or USD at desk rate', icon: DollarSign },
                ].map(m => {
                  const Icon = m.icon;
                  return (
                    <label key={m.label} className="flex items-center gap-3 p-3 cursor-pointer" style={{ background: theme.bg, border: `1px solid ${m.def ? theme.gold : theme.rule}`, borderLeft: m.def ? `3px solid ${theme.gold}` : `1px solid ${theme.rule}` }}>
                      <input type="radio" name="pay" defaultChecked={m.def} />
                      <Icon size={16} style={{ color: m.def ? theme.gold : theme.inkSoft }} />
                      <div className="flex-1">
                        <div className="text-sm" style={{ color: theme.ink, fontWeight: 500 }}>{m.label}</div>
                        <div className="text-[11px]" style={{ color: theme.inkMute }}>{m.detail}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: theme.leafSoft, color: theme.leaf, border: `2px solid ${theme.leaf}` }}>
                <Check size={32} />
              </div>
              <div className="font-serif" style={{ fontSize: '26px', color: theme.ink, letterSpacing: '-0.02em' }}>Welcome to The Float, {arrival.guest.split(' ')[0]}</div>
              <p className="text-sm mt-2" style={{ color: theme.inkSoft }}>Key card encoded for room {arrival.room || '215'}. Welcome SMS sent.</p>
              <div className="mt-5 grid grid-cols-2 gap-2 max-w-md mx-auto">
                {['Folio created', 'Door lock encoded', 'Welcome SMS sent', 'Wi-Fi credentials issued'].map(l => (
                  <div key={l} className="p-2 flex items-center gap-2 text-sm" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}`, borderLeft: `3px solid ${theme.leaf}`, color: theme.ink }}>
                    <Check size={14} style={{ color: theme.leaf }} />{l}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="px-7 py-4 flex items-center justify-between" style={{ background: theme.bg, borderTop: `1px solid ${theme.rule}` }}>
          <button className="text-sm flex items-center gap-1" style={{ color: theme.inkSoft }} onClick={() => step > 1 ? setStep(step - 1) : onClose()}>
            {step > 1 ? <><ChevronLeft size={14} /> Back</> : 'Cancel'}
          </button>
          {step < 5
            ? <Btn variant="primary" icon={ArrowRight} onClick={() => setStep(step + 1)}>Continue</Btn>
            : <Btn variant="primary" icon={Check} onClick={onClose}>Done</Btn>}
        </div>
      </div>
    </div>
  );
};

const FolioModal = ({ guest, onClose }) => {
  const charges = [
    { date: '22 Apr', desc: 'Room charge — ' + guest.type, amount: guest.total - 380 },
    { date: '22 Apr', desc: 'VAT + Tourism Levy', amount: 380 },
    { date: '23 Apr', desc: 'Restaurant — dinner', amount: 480 },
    { date: '24 Apr', desc: 'Sunset Bar — cocktails', amount: 240 },
    { date: '25 Apr', desc: 'Mini-bar', amount: 165 },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8" style={{ background: 'rgba(21,32,31,0.5)' }} onClick={onClose}>
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }} onClick={(e) => e.stopPropagation()}>
        <div className="px-7 py-5 flex items-start justify-between" style={{ background: theme.bgPanelAlt, borderBottom: `1px solid ${theme.rule}` }}>
          <div>
            <div className="text-[10px] uppercase" style={{ color: theme.gold, letterSpacing: '0.2em', fontWeight: 700 }}>Folio · {guest.id}</div>
            <div className="font-serif mt-1" style={{ fontSize: '24px', color: theme.ink, letterSpacing: '-0.01em' }}>{guest.guest}</div>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Room {guest.room} · {guest.nights} nights</div>
          </div>
          <button onClick={onClose} className="p-1.5"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-7">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}` }}>
                <th className="text-left py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Date</th>
                <th className="text-left py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Description</th>
                <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {charges.map((c, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                  <td className="py-3 text-xs" style={{ color: theme.inkMute }}>{c.date}</td>
                  <td className="py-3" style={{ color: theme.ink }}>{c.desc}</td>
                  <td className="py-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(c.amount)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: `2px solid ${theme.ink}` }}>
                <td className="pt-3 font-serif text-base" style={{ color: theme.ink }} colSpan={2}>Total</td>
                <td className="pt-3 text-right font-serif" style={{ color: theme.ink, fontSize: '20px' }}>{cedi(guest.total)}</td>
              </tr>
              {guest.folioBalance > 0 && (
                <tr>
                  <td className="pt-2 text-sm" style={{ color: theme.clay }} colSpan={2}>Outstanding</td>
                  <td className="pt-2 text-right font-serif" style={{ color: theme.clay, fontSize: '20px', fontWeight: 600 }}>{cedi(guest.folioBalance)}</td>
                </tr>
              )}
            </tfoot>
          </table>
        </div>
        <div className="px-7 py-4 flex items-center justify-between" style={{ background: theme.bg, borderTop: `1px solid ${theme.rule}` }}>
          <div className="flex gap-2">
            <Btn variant="ghost" size="sm" icon={Printer}>Print</Btn>
            <Btn variant="ghost" size="sm" icon={Mail}>Email</Btn>
          </div>
          <div className="flex gap-2">
            <Btn variant="secondary" onClick={onClose}>Close</Btn>
            {guest.folioBalance > 0 && <Btn variant="primary" icon={CreditCard}>Settle {cedi(guest.folioBalance)}</Btn>}
            {guest.folioBalance === 0 && guest.status !== 'departed' && <Btn variant="primary" icon={Check}>Check Out</Btn>}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// ROOM STATUS
// ============================================================================
const RoomStatusModule = () => {
  const [filter, setFilter] = useState('all');
  const [drawerRoom, setDrawerRoom] = useState(null);
  const counts = useMemo(() => {
    const c = { VC: 0, VD: 0, OC: 0, OD: 0, OOO: 0, OOS: 0, IN: 0 };
    ROOMS.forEach(r => c[r.status]++);
    return c;
  }, []);
  const labels = { 1: 'First Floor — Standard & Garden', 2: 'Second Floor — Deluxe', 3: 'Third Floor — Suites' };

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Housekeeping</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Room Status</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Live updates · 32 rooms</div>
          </div>
          <Btn variant="primary" icon={Download}>Export A4</Btn>
        </div>
      </div>
      <div className="px-4 md:px-8 py-4 md:py-6">
        <div className="grid grid-cols-7 gap-3 mb-6">
          {['VC', 'IN', 'OC', 'OD', 'VD', 'OOO', 'OOS'].map(code => {
            const s = STATUSES[code];
            const count = counts[code];
            const p = (count / ROOMS.length) * 100;
            return (
              <div key={code} className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-[10px] uppercase font-bold" style={{ color: theme.inkSoft, letterSpacing: '0.1em' }}>{s.code}</span>
                </div>
                <div className="font-serif text-3xl mb-1" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>{count}</div>
                <div className="text-xs mb-2" style={{ color: theme.inkMute }}>{s.label}</div>
                <div className="h-1 w-full overflow-hidden" style={{ background: theme.ruleSoft }}>
                  <div className="h-full" style={{ width: `${p}%`, background: s.color }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <span className="text-[10px] uppercase mr-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Filter</span>
          <button onClick={() => setFilter('all')} className="text-xs px-3 py-1.5"
            style={{ background: filter === 'all' ? theme.ink : 'transparent', color: filter === 'all' ? theme.bgPanel : theme.inkSoft, border: `1px solid ${filter === 'all' ? theme.ink : theme.rule}` }}>All</button>
          {Object.values(STATUSES).map(s => (
            <button key={s.code} onClick={() => setFilter(s.code)} className="text-xs px-3 py-1.5 flex items-center gap-1.5"
              style={{ background: filter === s.code ? s.color : 'transparent', color: filter === s.code ? '#FBF7EE' : theme.inkSoft, border: `1px solid ${filter === s.code ? s.color : theme.rule}` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: filter === s.code ? '#FBF7EE' : s.color }} />{s.code}
            </button>
          ))}
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map(floor => {
            const rooms = ROOMS.filter(r => r.floor === floor && (filter === 'all' || r.status === filter));
            if (rooms.length === 0) return null;
            return (
              <div key={floor}>
                <div className="mb-3">
                  <div className="text-[10px] uppercase" style={{ color: theme.gold, letterSpacing: '0.2em', fontWeight: 700 }}>Floor {floor}</div>
                  <h3 className="font-serif text-lg" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>{labels[floor]}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {rooms.map(r => {
                    const s = STATUSES[r.status];
                    return (
                      <button key={r.number} onClick={() => setDrawerRoom(r)}
                        className="text-left p-3 transition-all hover:translate-y-[-1px]"
                        style={{ background: s.soft, border: `1px solid ${s.color}30`, borderLeft: `3px solid ${s.color}` }}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-serif text-xl" style={{ color: s.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>{r.number}</div>
                            <div className="text-[9px] uppercase mt-1" style={{ color: s.ink, letterSpacing: '0.08em', opacity: 0.7 }}>{r.type}</div>
                          </div>
                          <span className="text-[10px] font-bold" style={{ color: s.ink }}>{s.code}</span>
                        </div>
                        {r.guest && (
                          <div className="text-xs mt-1 flex items-center gap-1 truncate" style={{ color: s.ink, opacity: 0.85 }}>
                            <UserCircle size={10} /><span className="truncate">{r.guest.split(' ')[0]}</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {drawerRoom && (
        <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(21,32,31,0.4)' }} onClick={() => setDrawerRoom(null)}>
          <div className="w-[420px] h-full overflow-y-auto" style={{ background: theme.bgPanel, borderLeft: `1px solid ${theme.rule}` }} onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5" style={{ background: STATUSES[drawerRoom.status].soft, borderBottom: `1px solid ${STATUSES[drawerRoom.status].color}30` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[10px] uppercase" style={{ color: STATUSES[drawerRoom.status].ink, letterSpacing: '0.14em', opacity: 0.7 }}>{drawerRoom.type} · Floor {drawerRoom.floor}</div>
                  <div className="font-serif" style={{ fontSize: '32px', color: STATUSES[drawerRoom.status].ink, letterSpacing: '-0.02em', lineHeight: 1 }}>Room {drawerRoom.number}</div>
                </div>
                <button onClick={() => setDrawerRoom(null)} className="p-1.5"><X size={18} /></button>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5" style={{ background: STATUSES[drawerRoom.status].color, color: '#FBF7EE' }}>
                <span className="font-bold text-xs">{STATUSES[drawerRoom.status].code}</span>
                <span>·</span><span className="text-sm">{STATUSES[drawerRoom.status].label}</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {drawerRoom.guest && (
                <div>
                  <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Current Guest</div>
                  <div className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                    <div className="text-sm" style={{ color: theme.ink, fontWeight: 500 }}>{drawerRoom.guest}</div>
                  </div>
                </div>
              )}
              <div>
                <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Update Status</div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {Object.values(STATUSES).filter(st => st.code !== drawerRoom.status).map(st => (
                    <button key={st.code} className="flex items-center gap-2 p-2.5"
                      style={{ background: theme.bg, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${st.color}` }}>
                      <div className="text-left">
                        <div className="text-xs font-bold" style={{ color: st.ink }}>{st.code}</div>
                        <div className="text-xs" style={{ color: theme.inkSoft }}>{st.label}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// F&B PERFORMANCE
// ============================================================================
const ApprovalsModule = () => {
  const [selected, setSelected] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const filtered = APPROVAL_REQUESTS.filter(r => filterType === 'all' || r.type === filterType);

  const stats = {
    pending: APPROVAL_REQUESTS.length,
    totalValue: APPROVAL_REQUESTS.reduce((s, r) => s + r.amount, 0),
    high: APPROVAL_REQUESTS.filter(r => r.priority === 'high').length,
    overDelegated: APPROVAL_REQUESTS.filter(r => r.amount > 10000).length,
  };

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Workflow · Manager Inbox</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Approvals</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Purchase requisitions, orders, and journal vouchers awaiting your decision</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="ghost" icon={RefreshCw}>Refresh</Btn>
            <Btn variant="secondary" icon={FileText}>Delegation Rules</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Pending Decisions" value={stats.pending} sublabel="awaiting your review" icon={ClipboardList} tone={theme.gold} />
          <KpiTile label="Total Value" value={cedi(stats.totalValue)} sublabel="across all pending" icon={DollarSign} />
          <KpiTile label="High Priority" value={stats.high} sublabel="needs urgent action" icon={AlertTriangle} tone={theme.clay} />
          <KpiTile label="Above Delegation" value={stats.overDelegated} sublabel={'over ' + cedi(10000) + ' — escalate to MD'} icon={ArrowUpRight} tone={theme.dusk} />
        </div>

        <div className="flex items-center gap-3 p-3" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
          <span className="text-[10px] uppercase mr-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Type</span>
          {['all', 'Purchase Requisition', 'Purchase Order', 'Journal Voucher'].map(t => (
            <button key={t} onClick={() => setFilterType(t)} className="text-xs px-3 py-1.5"
              style={{
                background: filterType === t ? theme.ink : 'transparent',
                color: filterType === t ? theme.bgPanel : theme.inkSoft,
                border: `1px solid ${filterType === t ? theme.ink : theme.rule}`,
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
              {t === 'all' ? 'All' : t === 'Purchase Requisition' ? 'PR' : t === 'Purchase Order' ? 'PO' : 'Journal'}
            </button>
          ))}
          <div className="flex-1" />
          <span className="text-xs" style={{ color: theme.inkMute }}>{filtered.length} of {APPROVAL_REQUESTS.length} pending</span>
        </div>

        <div className="space-y-3">
          {filtered.map(req => {
            const overDelegated = req.amount > 10000;
            return (
              <div key={req.id} onClick={() => setSelected(req)}
                className="grid grid-cols-12 gap-4 p-4 cursor-pointer transition-all hover:translate-y-[-1px]"
                style={{
                  background: theme.bgPanel,
                  border: `1px solid ${theme.rule}`,
                  borderLeft: `3px solid ${req.priority === 'high' ? theme.clay : overDelegated ? theme.dusk : theme.gold}`,
                }}>
                <div className="col-span-1">
                  <div className="font-mono text-xs" style={{ color: theme.inkSoft }}>{req.id}</div>
                  <div className="text-[10px] mt-1" style={{ color: theme.inkMute }}>{req.submitted}</div>
                </div>
                <div className="col-span-4 border-l pl-4" style={{ borderColor: theme.ruleSoft }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Pill tone="neutral" size="sm">{req.type}</Pill>
                    <Pill tone="dusk" size="sm">{req.dept}</Pill>
                    {req.priority === 'high' && <Pill tone="clay" size="sm">High priority</Pill>}
                  </div>
                  <div className="font-serif" style={{ fontSize: '17px', color: theme.ink, letterSpacing: '-0.01em', fontWeight: 500 }}>{req.subject}</div>
                  <div className="text-xs mt-0.5 flex items-center gap-2" style={{ color: theme.inkSoft }}>
                    <UserCircle size={10} />{req.requester} · {req.requesterRole}
                  </div>
                </div>
                <div className="col-span-2 border-l pl-4" style={{ borderColor: theme.ruleSoft }}>
                  <div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Amount</div>
                  <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.02em' }}>{cedi(req.amount)}</div>
                  {overDelegated && <div className="text-[10px] mt-1" style={{ color: theme.dusk }}>Over GM delegation limit</div>}
                </div>
                <div className="col-span-2 border-l pl-4" style={{ borderColor: theme.ruleSoft }}>
                  <div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Due By</div>
                  <div className="text-sm" style={{ color: theme.ink }}>{req.dueBy}</div>
                  {req.attachments.length > 0 && (
                    <div className="text-[10px] mt-1 flex items-center gap-1" style={{ color: theme.teal }}>
                      <FileText size={10} />{req.attachments.length} attachment{req.attachments.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
                <div className="col-span-3 border-l pl-4 flex items-center justify-end gap-2" style={{ borderColor: theme.ruleSoft }}>
                  <button className="px-3 py-2 flex items-center gap-1.5 text-xs"
                    style={{ background: 'transparent', border: `1px solid ${theme.rule}`, color: theme.inkSoft, letterSpacing: '0.06em', textTransform: 'uppercase' }}
                    onClick={(e) => { e.stopPropagation(); }}>
                    <X size={12} /> Reject
                  </button>
                  <button className="px-3 py-2 flex items-center gap-1.5 text-xs font-medium"
                    style={{ background: theme.leaf, border: `1px solid ${theme.leaf}`, color: '#FBF7EE', letterSpacing: '0.06em', textTransform: 'uppercase' }}
                    onClick={(e) => { e.stopPropagation(); }}>
                    <Check size={12} /> Approve
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <Card title="Recent Decisions · Last 7 Days" accent={theme.teal} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Reference</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Subject</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Amount</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Decision</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Approver</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>When</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_DECISIONS.map((d, i) => (
                <tr key={d.id} style={{ borderBottom: i < RECENT_DECISIONS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5">
                    <div className="font-mono text-xs" style={{ color: theme.inkSoft }}>{d.id}</div>
                    <div className="text-[10px]" style={{ color: theme.inkMute }}>{d.type}</div>
                  </td>
                  <td className="py-3 px-3" style={{ color: theme.ink }}>{d.subject}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(d.amount)}</td>
                  <td className="py-3 px-3">
                    <Pill tone={d.decision === 'approved' ? 'leaf' : 'clay'} size="sm">
                      {d.decision === 'approved' ? <Check size={9} /> : <X size={9} />}
                      {d.decision}
                    </Pill>
                    {d.reason && <div className="text-[11px] mt-1 italic" style={{ color: theme.inkSoft }}>{d.reason}</div>}
                  </td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{d.approver}</td>
                  <td className="py-3 px-5 text-xs" style={{ color: theme.inkMute }}>{d.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(21,32,31,0.4)' }} onClick={() => setSelected(null)}>
          <div className="w-[540px] h-full overflow-y-auto" style={{ background: theme.bgPanel, borderLeft: `1px solid ${theme.rule}` }} onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5" style={{ background: selected.priority === 'high' ? theme.claySoft : theme.bgPanelAlt, borderBottom: `1px solid ${theme.rule}` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[10px] uppercase" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>{selected.id}</div>
                  <div className="font-serif mt-1" style={{ fontSize: '24px', color: theme.ink, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{selected.subject}</div>
                  <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>{selected.type} · {selected.dept}</div>
                </div>
                <button onClick={() => setSelected(null)} className="p-1.5"><X size={18} /></button>
              </div>
              <div className="text-3xl font-serif mt-3" style={{ color: theme.gold, letterSpacing: '-0.02em' }}>{cedi(selected.amount)}</div>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Requester</div>
                <div className="flex items-center gap-3 p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: theme.tealSoft, color: theme.teal }}>
                    {selected.requester.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <div className="text-sm" style={{ color: theme.ink, fontWeight: 500 }}>{selected.requester}</div>
                    <div className="text-xs" style={{ color: theme.inkMute }}>{selected.requesterRole}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Description</div>
                <p className="text-sm leading-relaxed" style={{ color: theme.ink }}>{selected.description}</p>
              </div>
              <div>
                <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Cost Breakdown</div>
                <div className="space-y-1">
                  {selected.breakdown.map((b, i) => (
                    <div key={i} className="flex items-center justify-between py-2 px-3 text-sm"
                      style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                      <span style={{ color: theme.ink }}>{b.item}</span>
                      <span className="font-mono" style={{ color: theme.ink, fontWeight: 500 }}>{cedi(b.cost)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-2 px-3 text-sm" style={{ borderTop: `2px solid ${theme.ink}`, marginTop: 8 }}>
                    <span className="font-serif" style={{ color: theme.ink, fontWeight: 600 }}>Total</span>
                    <span className="font-serif" style={{ color: theme.gold, fontSize: '17px', letterSpacing: '-0.02em' }}>{cedi(selected.amount)}</span>
                  </div>
                </div>
              </div>
              {selected.attachments.length > 0 && (
                <div>
                  <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Attachments</div>
                  <div className="space-y-1.5">
                    {selected.attachments.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 text-sm" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                        <FileText size={14} style={{ color: theme.teal }} />
                        <span style={{ color: theme.ink }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="space-y-2 pt-2">
                <Btn variant="primary" size="md" icon={Check}>Approve {cedi(selected.amount)}</Btn>
                <div className="flex gap-2">
                  <Btn variant="secondary" size="md" icon={X}>Reject</Btn>
                  <Btn variant="ghost" size="md" icon={MessageSquare}>Request Changes</Btn>
                </div>
                {selected.amount > 10000 && (
                  <div className="p-3 mt-3 flex items-start gap-2" style={{ background: theme.duskSoft, border: `1px solid ${theme.dusk}40`, borderLeft: `3px solid ${theme.dusk}` }}>
                    <AlertCircle size={14} style={{ color: theme.dusk, marginTop: 2 }} />
                    <div className="text-xs" style={{ color: theme.ink }}>
                      <span style={{ fontWeight: 600 }}>Above GM delegation limit ({cedi(10000)}).</span> Approval will be escalated to MD for ratification.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// IN-HOUSE GUEST LIST (FOM)
// ============================================================================
const ProcurementModule = () => {
  const [tab, setTab] = useState('overview');
  const [selectedPO, setSelectedPO] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'suppliers', label: 'Suppliers', icon: Building2 },
    { id: 'pos', label: 'Purchase Orders', icon: FileSignature },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'deliveries', label: 'Deliveries', icon: Truck },
  ];

  const totalStockValue = INVENTORY.reduce((s, i) => s + i.value, 0);
  const criticalItems = INVENTORY.filter(i => i.status === 'critical').length;
  const lowItems = INVENTORY.filter(i => i.status === 'low').length;
  const openPOs = PURCHASE_ORDERS.filter(p => p.status === 'awaiting-approval' || p.status === 'in-transit').length;
  const pendingPOValue = PURCHASE_ORDERS.filter(p => p.status === 'awaiting-approval').reduce((s, p) => s + p.amount, 0);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Supply Chain · Backend</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Procurement & Inventory</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{SUPPLIERS.length} active suppliers · {INVENTORY.length} SKUs tracked · {openPOs} POs in flight</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Download}>Export</Btn>
            <Btn variant="primary" icon={Plus}>New Purchase Order</Btn>
          </div>
        </div>
        <div className="px-8 flex gap-1" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
          {tabs.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className="flex items-center gap-2 px-4 py-3 text-sm transition-all"
                style={{ color: active ? theme.ink : theme.inkSoft, fontWeight: active ? 600 : 400, borderBottom: active ? `2px solid ${theme.gold}` : '2px solid transparent', marginBottom: '-1px' }}>
                <Icon size={14} />{t.label}
              </button>
            );
          })}
        </div>
      </div>

      {tab === 'overview' && (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiTile label="Stock Value · On Hand" value={cedi(totalStockValue)} sublabel={`${INVENTORY.length} SKUs`} icon={Package} tone={theme.gold} />
            <KpiTile label="Critical Stock" value={criticalItems} sublabel="order immediately" icon={AlertTriangle} tone={theme.clay} />
            <KpiTile label="Low Stock" value={lowItems} sublabel="approaching reorder" icon={AlertCircle} tone={theme.gold} />
            <KpiTile label="Pending PO Value" value={cedi(pendingPOValue)} sublabel="awaiting GM approval" icon={FileSignature} tone={theme.dusk} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Stock Status by Category" accent={theme.teal}>
              <div className="space-y-3">
                {[...new Set(INVENTORY.map(i => i.category.split(' · ')[0]))].map(cat => {
                  const items = INVENTORY.filter(i => i.category.startsWith(cat));
                  const value = items.reduce((s, i) => s + i.value, 0);
                  const issues = items.filter(i => i.status !== 'ok').length;
                  return (
                    <div key={cat} className="flex items-center justify-between p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                      <div className="flex-1">
                        <div className="font-serif" style={{ fontSize: '17px', color: theme.ink, letterSpacing: '-0.01em' }}>{cat}</div>
                        <div className="text-xs mt-0.5" style={{ color: theme.inkSoft }}>{items.length} SKUs</div>
                      </div>
                      <div className="text-right mr-4">
                        <div className="font-serif" style={{ fontSize: '17px', color: theme.ink }}>{cedi(value)}</div>
                        <div className="text-xs" style={{ color: theme.inkMute }}>on hand</div>
                      </div>
                      {issues > 0
                        ? <Pill tone="clay" size="sm">{issues} need attention</Pill>
                        : <Pill tone="leaf" size="sm">Healthy</Pill>}
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card title="Top Suppliers · YTD Spend" accent={theme.gold}>
              <div className="space-y-2">
                {[...SUPPLIERS].sort((a, b) => b.ytdSpend - a.ytdSpend).slice(0, 6).map((s, i) => {
                  const max = SUPPLIERS[0].ytdSpend;
                  const pct = (s.ytdSpend / max) * 100;
                  return (
                    <div key={s.id}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif" style={{ fontSize: '14px', color: theme.gold, fontWeight: 500 }}>{String(i + 1).padStart(2, '0')}</span>
                          <span style={{ color: theme.ink, fontWeight: 500 }}>{s.name}</span>
                        </div>
                        <span className="font-mono" style={{ color: theme.ink }}>{cedi(s.ytdSpend)}</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden" style={{ background: theme.ruleSoft }}>
                        <div className="h-full" style={{ width: `${pct}%`, background: theme.gold }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          <Card title="Critical & Low Stock — Reorder Alerts" accent={theme.clay} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>SKU · Item</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Category</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>On Hand · Par</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Supplier</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
                  <th className="text-right py-3 px-5"></th>
                </tr>
              </thead>
              <tbody>
                {INVENTORY.filter(i => i.status !== 'ok').map((i, idx, arr) => (
                  <tr key={i.sku} style={{ borderBottom: idx < arr.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5">
                      <div style={{ color: theme.ink, fontWeight: 500 }}>{i.name}</div>
                      <div className="font-mono text-[10px]" style={{ color: theme.inkMute }}>{i.sku}</div>
                    </td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{i.category}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="font-mono" style={{ color: i.status === 'critical' ? theme.clay : theme.ink, fontWeight: 600 }}>{i.current}</span>
                      <span className="text-xs" style={{ color: theme.inkMute }}> / {i.par} {i.unit}</span>
                    </td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{i.supplier}</td>
                    <td className="py-3 px-3">
                      <Pill tone={i.status === 'critical' ? 'clay' : 'gold'} size="sm">
                        {i.status === 'critical' ? 'Order now' : 'Low'}
                      </Pill>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <Btn variant="primary" size="sm" icon={ShoppingCart}>Reorder</Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <div className="p-5 flex items-start gap-3" style={{ background: theme.bgPanelAlt, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.gold}` }}>
            <ClipboardList size={16} style={{ color: theme.gold, marginTop: 2 }} />
            <div className="text-sm" style={{ color: theme.inkSoft }}>
              <span className="font-serif" style={{ color: theme.ink }}>Connected to Approvals: </span>
              3 POs are currently awaiting your approval (Pool pump ₵5,800 · Weekend produce ₵8,400 · Linen ₵3,200). They appear in both this module and your Approvals queue — approve from either place.
            </div>
          </div>
        </div>
      )}

      {tab === 'suppliers' && (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiTile label="Active Suppliers" value={SUPPLIERS.length} sublabel="across all categories" icon={Building2} tone={theme.teal} />
            <KpiTile label="Preferred Vendors" value={SUPPLIERS.filter(s => s.preferred).length} sublabel="quality & terms approved" icon={Star} tone={theme.gold} />
            <KpiTile label="YTD Total Spend" value={cedi(SUPPLIERS.reduce((s, x) => s + x.ytdSpend, 0))} sublabel="across all suppliers" icon={DollarSign} />
            <KpiTile label="Avg Rating" value={(SUPPLIERS.reduce((s, x) => s + x.rating, 0) / SUPPLIERS.length).toFixed(1)} sublabel="of 5.0" icon={Award} tone={theme.leaf} />
          </div>

          <Card title="Supplier Directory" accent={theme.teal} padded={false}
            action={<Btn variant="primary" size="sm" icon={Plus}>Add Supplier</Btn>}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Supplier</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Category · Location</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Contact</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Terms</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>YTD Spend</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Rating</th>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {SUPPLIERS.map((s, i) => (
                  <tr key={s.id} style={{ borderBottom: i < SUPPLIERS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2">
                        <span style={{ color: theme.ink, fontWeight: 500 }}>{s.name}</span>
                        {s.preferred && <Star size={11} fill={theme.gold} style={{ color: theme.gold }} />}
                      </div>
                      <div className="font-mono text-[10px]" style={{ color: theme.inkMute }}>{s.id}</div>
                      {s.note && <div className="text-[10px] italic mt-0.5" style={{ color: theme.leaf }}>{s.note}</div>}
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-xs" style={{ color: theme.ink }}>{s.category}</div>
                      <div className="text-[10px]" style={{ color: theme.inkMute }}><MapPin size={9} className="inline mr-1" />{s.location}</div>
                    </td>
                    <td className="py-3 px-3 text-xs">
                      <div style={{ color: theme.ink }}>{s.contact}</div>
                      <div style={{ color: theme.inkMute }}>{s.phone}</div>
                    </td>
                    <td className="py-3 px-3"><Pill tone="neutral" size="sm">{s.terms}</Pill></td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(s.ytdSpend)}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="font-serif" style={{ fontSize: '14px', color: theme.gold, letterSpacing: '-0.01em' }}>{s.rating}</span>
                      <span className="text-[10px]" style={{ color: theme.inkMute }}> / 5</span>
                    </td>
                    <td className="py-3 px-5">
                      {s.openPOs > 0
                        ? <Pill tone="gold" size="sm">{s.openPOs} open PO</Pill>
                        : <Pill tone="leaf" size="sm">No open</Pill>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === 'pos' && (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiTile label="Awaiting Approval" value={PURCHASE_ORDERS.filter(p => p.status === 'awaiting-approval').length} sublabel={cedi(pendingPOValue) + ' total'} icon={Clock3} tone={theme.gold} />
            <KpiTile label="In Transit" value={PURCHASE_ORDERS.filter(p => p.status === 'in-transit').length} sublabel="awaiting delivery" icon={Truck} tone={theme.teal} />
            <KpiTile label="Delivered (this month)" value={PURCHASE_ORDERS.filter(p => p.status === 'delivered').length} sublabel="GRN issued" icon={CircleCheck} tone={theme.leaf} />
            <KpiTile label="MTD PO Value" value={cedi(PURCHASE_ORDERS.reduce((s, p) => s + p.amount, 0))} sublabel={`${PURCHASE_ORDERS.length} orders`} icon={DollarSign} />
          </div>

          <Card title="Purchase Orders" accent={theme.gold} padded={false}
            action={<Btn variant="primary" size="sm" icon={Plus}>New PO</Btn>}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>PO ID</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Subject · Supplier</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Requester</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Amount</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Delivery</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
                  <th className="text-right py-3 px-5"></th>
                </tr>
              </thead>
              <tbody>
                {PURCHASE_ORDERS.map((p, i) => {
                  const tone = p.status === 'delivered' ? 'leaf' : p.status === 'in-transit' ? 'teal' : 'gold';
                  const label = p.status === 'delivered' ? 'Delivered' : p.status === 'in-transit' ? 'In transit' : 'Awaiting approval';
                  return (
                    <tr key={p.id} onClick={() => setSelectedPO(p)}
                      style={{ borderBottom: i < PURCHASE_ORDERS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none', cursor: 'pointer', opacity: p.status === 'delivered' ? 0.65 : 1 }}>
                      <td className="py-3 px-5">
                        <div className="font-mono" style={{ color: theme.ink, fontWeight: 500 }}>{p.id}</div>
                        <div className="text-[10px]" style={{ color: theme.inkMute }}>{p.dateRaised}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div style={{ color: theme.ink, fontWeight: 500 }}>{p.subject}</div>
                        <div className="text-xs mt-0.5" style={{ color: theme.inkSoft }}>{p.supplier} · {p.dept}</div>
                        {p.linkedTo && <div className="text-[10px] mt-0.5 italic" style={{ color: theme.teal }}>Linked: {p.linkedTo}</div>}
                      </td>
                      <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{p.requester}</td>
                      <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{cedi(p.amount)}</td>
                      <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{p.expectedDelivery}</td>
                      <td className="py-3 px-3"><Pill tone={tone} size="sm">{label}</Pill></td>
                      <td className="py-3 px-5 text-right"><ChevronRight size={14} style={{ color: theme.inkMute }} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === 'inventory' && (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiTile label="Total SKUs" value={INVENTORY.length} sublabel="actively tracked" icon={Package} />
            <KpiTile label="Stock Value" value={cedi(totalStockValue)} sublabel="across all categories" icon={DollarSign} tone={theme.gold} />
            <KpiTile label="Critical" value={criticalItems} sublabel="immediate action" icon={AlertTriangle} tone={theme.clay} />
            <KpiTile label="Healthy" value={INVENTORY.filter(i => i.status === 'ok').length} sublabel="adequate stock" icon={CircleCheck} tone={theme.leaf} />
          </div>

          <div className="flex items-center gap-2 p-3 flex-wrap" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
            <span className="text-[10px] uppercase mr-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Category</span>
            {['all', 'Kitchen', 'Bar', 'Cleaning'].map(c => (
              <button key={c} onClick={() => setFilterCategory(c)} className="text-xs px-3 py-1.5"
                style={{
                  background: filterCategory === c ? theme.ink : 'transparent',
                  color: filterCategory === c ? theme.bgPanel : theme.inkSoft,
                  border: `1px solid ${filterCategory === c ? theme.ink : theme.rule}`,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>{c === 'all' ? 'All' : c}</button>
            ))}
            <div className="flex-1" />
            <Btn variant="secondary" size="sm" icon={ClipboardList}>Stock Count</Btn>
          </div>

          <Card title="Inventory Register" accent={theme.dusk} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>SKU · Item</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Category</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>On Hand</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Par</th>
                  <th className="text-left py-3 px-8 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Stock Level</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Value</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Last Restock</th>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {INVENTORY.filter(i => filterCategory === 'all' || i.category.startsWith(filterCategory)).map((i, idx, arr) => {
                  const pct = (i.current / i.par) * 100;
                  const tone = i.status === 'critical' ? 'clay' : i.status === 'low' ? 'gold' : 'leaf';
                  const barColor = i.status === 'critical' ? theme.clay : i.status === 'low' ? theme.gold : theme.leaf;
                  return (
                    <tr key={i.sku} style={{ borderBottom: idx < arr.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                      <td className="py-3 px-5">
                        <div style={{ color: theme.ink, fontWeight: 500 }}>{i.name}</div>
                        <div className="font-mono text-[10px]" style={{ color: theme.inkMute }}>{i.sku}</div>
                      </td>
                      <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{i.category}</td>
                      <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{i.current} <span className="text-[10px]" style={{ color: theme.inkMute }}>{i.unit}</span></td>
                      <td className="py-3 px-3 text-right font-mono text-xs" style={{ color: theme.inkSoft }}>{i.par}</td>
                      <td className="py-3 px-8 w-1/4">
                        <div className="h-2 w-full overflow-hidden" style={{ background: theme.ruleSoft }}>
                          <div className="h-full" style={{ width: `${Math.min(pct, 100)}%`, background: barColor }} />
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(i.value)}</td>
                      <td className="py-3 px-3 text-xs" style={{ color: theme.inkMute }}>{i.lastRestock}</td>
                      <td className="py-3 px-5">
                        <Pill tone={tone} size="sm">{i.status === 'critical' ? 'Order now' : i.status === 'low' ? 'Low' : 'OK'}</Pill>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === 'deliveries' && (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <KpiTile label="Expected Today" value={2} sublabel="Akosombo Fresh + 1" icon={Truck} tone={theme.teal} />
            <KpiTile label="Received This Week" value={4} sublabel="3 OK · 1 with discrepancy" icon={CircleCheck} tone={theme.leaf} />
            <KpiTile label="Discrepancies · MTD" value={1} sublabel="resolved with credit notes" icon={AlertTriangle} tone={theme.gold} />
          </div>

          <Card title="Recent Goods Received Notes (GRN)" accent={theme.leaf} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>GRN</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Supplier · PO</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Received</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Received By</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Value</th>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_DELIVERIES.map((d, i) => (
                  <tr key={d.id} style={{ borderBottom: i < RECENT_DELIVERIES.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5 font-mono text-xs" style={{ color: theme.inkSoft }}>{d.id}</td>
                    <td className="py-3 px-3">
                      <div style={{ color: theme.ink, fontWeight: 500 }}>{d.supplier}</div>
                      <div className="font-mono text-[10px]" style={{ color: theme.inkMute }}>{d.po}</div>
                    </td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{d.received}</td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{d.receivedBy}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(d.value)}</td>
                    <td className="py-3 px-5">
                      {d.status === 'received-ok'
                        ? <Pill tone="leaf" size="sm"><Check size={9} /> Received OK</Pill>
                        : <Pill tone="gold" size="sm"><AlertTriangle size={9} /> Discrepancy</Pill>}
                      {d.note && <div className="text-[10px] mt-0.5 italic" style={{ color: theme.inkSoft }}>{d.note}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {/* PO detail drawer */}
      {selectedPO && (
        <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(21,32,31,0.4)' }} onClick={() => setSelectedPO(null)}>
          <div className="w-[520px] h-full overflow-y-auto" style={{ background: theme.bgPanel, borderLeft: `1px solid ${theme.rule}` }} onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5" style={{ background: theme.bgPanelAlt, borderBottom: `1px solid ${theme.rule}` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[10px] uppercase" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>{selectedPO.id}</div>
                  <div className="font-serif mt-1" style={{ fontSize: '22px', color: theme.ink, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{selectedPO.subject}</div>
                  <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>{selectedPO.supplier} · {selectedPO.dept}</div>
                </div>
                <button onClick={() => setSelectedPO(null)} className="p-1.5"><X size={18} /></button>
              </div>
              <div className="font-serif text-3xl mt-3" style={{ color: theme.gold, letterSpacing: '-0.02em' }}>{cedi(selectedPO.amount)}</div>
              <div className="flex items-center gap-2 mt-3">
                <Pill tone={selectedPO.status === 'delivered' ? 'leaf' : selectedPO.status === 'in-transit' ? 'teal' : 'gold'}>
                  {selectedPO.status === 'delivered' ? 'Delivered' : selectedPO.status === 'in-transit' ? 'In transit' : 'Awaiting approval'}
                </Pill>
                {selectedPO.linkedTo && <Pill tone="dusk" size="sm">Linked: {selectedPO.linkedTo}</Pill>}
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Order Details</div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <InfoTile label="Date raised" value={selectedPO.dateRaised} />
                  <InfoTile label="Expected delivery" value={selectedPO.expectedDelivery} />
                  <InfoTile label="Requester" value={selectedPO.requester} />
                  <InfoTile label="Department" value={selectedPO.dept} />
                  {selectedPO.deliveredOn && <InfoTile label="Delivered on" value={selectedPO.deliveredOn} />}
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Line Items</div>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${theme.rule}` }}>
                      <th className="text-left py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Item</th>
                      <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Qty</th>
                      <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPO.items.map((item, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                        <td className="py-2" style={{ color: theme.ink }}>{item.desc}</td>
                        <td className="py-2 text-right text-xs" style={{ color: theme.inkSoft }}>{item.qty} {item.unit}</td>
                        <td className="py-2 text-right font-mono" style={{ color: theme.ink }}>{cedi(item.qty * item.price)}</td>
                      </tr>
                    ))}
                    <tr style={{ borderTop: `2px solid ${theme.ink}` }}>
                      <td className="py-2 font-serif" style={{ color: theme.ink, fontWeight: 600 }} colSpan={2}>Total</td>
                      <td className="py-2 text-right font-serif" style={{ color: theme.gold, fontSize: '17px' }}>{cedi(selectedPO.amount)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {selectedPO.status === 'awaiting-approval' && (
                <div className="space-y-2 pt-2">
                  <Btn variant="primary" icon={Check}>Approve PO</Btn>
                  <div className="flex gap-2">
                    <Btn variant="secondary" size="md" icon={X}>Reject</Btn>
                    <Btn variant="ghost" size="md" icon={MessageSquare}>Add Note</Btn>
                  </div>
                </div>
              )}
              {selectedPO.status === 'in-transit' && (
                <div className="p-3" style={{ background: theme.tealSoft, border: `1px solid ${theme.teal}30`, borderLeft: `3px solid ${theme.teal}` }}>
                  <div className="flex items-center gap-2 text-sm" style={{ color: theme.tealDeep }}>
                    <Truck size={14} />
                    <span>Expected today. Notify {selectedPO.requester} on receipt.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// RESTAURANT POS — table floor plan, order entry, KOT
// ============================================================================

const GmComingSoon = ({ title }) => (
  <div className="p-4 md:p-6" style={{ background: theme.bg, minHeight: '100%' }}>
    <SectionHeader overline="Module" title={title} />
    <div className="p-12 text-center" style={{ background: theme.bgPanel, border: `1px dashed ${theme.rule}` }}>
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ background: theme.tealSoft, color: theme.teal }}><Sparkles size={20} /></div>
      <p className="font-serif text-lg mb-2" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Module defined in the BRD</p>
      <p className="text-sm" style={{ color: theme.inkSoft }}>To be built in the next sprint.</p>
    </div>
  </div>
);

// ============================================================================
// APP
// ============================================================================
// ============================================================================
// CHANNEL MANAGER MODULE · For Jana Kruger
// ============================================================================
// ============================================================================
// CHANNEL MANAGER · Jana Kruger
// ============================================================================
const CHANNELS = [
  { id: 'direct',     name: 'Direct (thefloatgh.com)', commission: 0,    color: theme.gold,     status: 'connected', lastSync: '06:42', bookings30d: 84,  revenue30d: 184800 },
  { id: 'booking',    name: 'Booking.com',              commission: 0.15, color: theme.teal,     status: 'connected', lastSync: '06:42', bookings30d: 142, revenue30d: 268400 },
  { id: 'expedia',    name: 'Expedia',                  commission: 0.18, color: theme.dusk,     status: 'connected', lastSync: '06:38', bookings30d: 64,  revenue30d: 128200 },
  { id: 'hotels',     name: 'Hotels.com',               commission: 0.18, color: theme.hibiscus, status: 'connected', lastSync: '06:38', bookings30d: 28,  revenue30d: 52400 },
  { id: 'hotelbeds',  name: 'Hotelbeds (B2B)',          commission: 0.22, color: theme.clay,     status: 'connected', lastSync: '06:30', bookings30d: 18,  revenue30d: 38600 },
];

const ROOM_TYPES = [
  { id: 'std',    name: 'Standard Lakeside', baseRate: 1450, count: 18 },
  { id: 'dlx',    name: 'Deluxe Lake View',  baseRate: 1850, count: 8 },
  { id: 'fam',   name: 'Family Suite',      baseRate: 2400, count: 4 },
  { id: 'pres', name: 'Presidential Suite', baseRate: 4200, count: 2 },
];

// 14-day rate calendar — generate mock data
const generateCalendar = () => {
  const days = [];
  const start = new Date(2026, 3, 25);
  for (let i = 0; i < 14; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    days.push({
      date: d,
      label: d.toLocaleDateString('en', { day: '2-digit', month: 'short', weekday: 'short' }),
      isWeekend,
      multiplier: isWeekend ? 1.25 : 1.0,
    });
  }
  return days;
};

const ChannelOverviewModule = () => {
  const totalBookings = CHANNELS.reduce((s, c) => s + c.bookings30d, 0);
  const totalRevenue = CHANNELS.reduce((s, c) => s + c.revenue30d, 0);
  const directBookings = CHANNELS.find(c => c.id === 'direct').bookings30d;
  const directShare = (directBookings / totalBookings) * 100;
  const totalCommissionPaid = CHANNELS.reduce((s, c) => s + (c.revenue30d * c.commission), 0);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Distribution · Last 30 days</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Channel Manager</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>5 channels connected · all syncing · last sync 06:42</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={RefreshCw}>Force Sync All</Btn>
            <Btn variant="primary" icon={Send}>Push Rates</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Total Bookings · 30d" value={totalBookings} sublabel="across all channels" icon={Calendar} tone={theme.gold} />
          <KpiTile label="Direct Share" value={pct(directShare)} sublabel="vs OTA" icon={TrendingUp} tone={directShare > 25 ? theme.leaf : theme.gold} />
          <KpiTile label="Revenue · 30d" value={cedi(totalRevenue)} sublabel="all channels" icon={DollarSign} tone={theme.teal} />
          <KpiTile label="OTA Commissions Paid" value={cedi(totalCommissionPaid)} sublabel={pct(totalCommissionPaid/totalRevenue*100) + ' of revenue'} icon={Percent} tone={theme.clay} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Channel Mix · Last 30 days" accent={theme.gold}>
            <div className="space-y-3">
              {CHANNELS.map(c => {
                const sharePct = (c.bookings30d / totalBookings) * 100;
                return (
                  <div key={c.id}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                        <span style={{ color: theme.ink, fontWeight: 500 }}>{c.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs" style={{ color: theme.inkMute }}>{c.bookings30d} bookings</span>
                        <span className="font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{cedi(c.revenue30d)}</span>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden" style={{ background: theme.ruleSoft }}>
                      <div className="h-full" style={{ width: `${sharePct}%`, background: c.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card title="Channel Health" accent={theme.teal}>
            <div className="space-y-2">
              {CHANNELS.map(c => (
                <div key={c.id} className="flex items-center justify-between p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}`, borderLeft: `3px solid ${c.color}` }}>
                  <div className="flex-1">
                    <div className="text-sm" style={{ color: theme.ink, fontWeight: 500 }}>{c.name}</div>
                    <div className="text-[10px]" style={{ color: theme.inkMute }}>
                      Commission: {pct(c.commission * 100)} · Last sync: {c.lastSync}
                    </div>
                  </div>
                  <Pill tone="leaf" size="sm"><Check size={9} /> {c.status}</Pill>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="p-4 flex items-start gap-3" style={{ background: theme.goldSoft + '40', border: `1px solid ${theme.gold}30`, borderLeft: `3px solid ${theme.gold}` }}>
          <Sparkles size={16} style={{ color: theme.gold, marginTop: 2 }} />
          <div className="flex-1 text-sm">
            <span style={{ color: theme.ink, fontWeight: 600 }}>Direct booking opportunity: </span>
            <span style={{ color: theme.inkSoft }}>
              Direct share is {pct(directShare)} but commission costs are {cedi(totalCommissionPaid)}/month.
              A 5% shift from OTA to direct would save approximately {cedi(totalCommissionPaid * 0.30)} per month.
              Consider adding a direct-booking promo code or improving website conversion.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChannelRatesModule = () => {
  const [selectedRoomType, setSelectedRoomType] = useState('std');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const calendar = generateCalendar();
  const room = ROOM_TYPES.find(r => r.id === selectedRoomType);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Rate Management</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Rate Calendar · 14 days</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Drag-select dates to bulk update rates across channels · weekend pricing applied automatically</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Plus}>Add Promotion</Btn>
            <Btn variant="primary" icon={Send}>Push to Channels</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="flex items-center gap-2 p-3 flex-wrap" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
          <span className="text-[10px] uppercase mr-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Room Type</span>
          {ROOM_TYPES.map(r => (
            <button key={r.id} onClick={() => setSelectedRoomType(r.id)} className="text-xs px-3 py-1.5"
              style={{ background: selectedRoomType === r.id ? theme.ink : 'transparent', color: selectedRoomType === r.id ? theme.bgPanel : theme.inkSoft, border: `1px solid ${selectedRoomType === r.id ? theme.ink : theme.rule}`, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {r.name}
            </button>
          ))}
        </div>

        <Card title={`${room.name} · 14-Day Rate Grid`} accent={theme.gold} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Date</th>
                {CHANNELS.map(c => (
                  <th key={c.id} className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: c.color, letterSpacing: '0.14em', fontWeight: 700 }}>{c.name.split(' ')[0]}</th>
                ))}
                <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Avail</th>
              </tr>
            </thead>
            <tbody>
              {calendar.map((d, i) => {
                const baseRate = Math.round(room.baseRate * d.multiplier);
                return (
                  <tr key={i} style={{ borderBottom: i < calendar.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none', background: d.isWeekend ? theme.goldSoft + '20' : 'transparent' }}>
                    <td className="py-3 px-5">
                      <div style={{ color: theme.ink, fontWeight: 500 }}>{d.label}</div>
                      {d.isWeekend && <div className="text-[10px] italic" style={{ color: theme.gold }}>Weekend +25%</div>}
                    </td>
                    {CHANNELS.map((c, ci) => {
                      // Slight rate variation per channel to show parity
                      const channelRate = ci === 0 ? baseRate : ci === 4 ? Math.round(baseRate * 0.95) : baseRate;
                      const isParity = channelRate === baseRate;
                      return (
                        <td key={c.id} className="py-3 px-3 text-right">
                          <div className="font-mono" style={{ color: isParity ? theme.ink : theme.clay, fontWeight: 600 }}>₵{fmt(channelRate)}</div>
                          {!isParity && <div className="text-[10px]" style={{ color: theme.clay }}>parity warning</div>}
                        </td>
                      );
                    })}
                    <td className="py-3 px-5 text-right font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{room.count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <div className="p-4 flex items-start gap-3" style={{ background: theme.duskSoft + '40', border: `1px solid ${theme.dusk}30`, borderLeft: `3px solid ${theme.dusk}` }}>
          <AlertCircle size={16} style={{ color: theme.dusk, marginTop: 2 }} />
          <div className="flex-1 text-sm">
            <span style={{ color: theme.ink, fontWeight: 600 }}>Rate parity warning: </span>
            <span style={{ color: theme.inkSoft }}>
              Hotelbeds is showing rates 5% below other channels for {room.name}. This violates Booking.com and Expedia parity clauses.
              Either match parity or use Hotelbeds' opaque-rate channel routing.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChannelInventoryModule = () => {
  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Inventory & Restrictions</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Inventory Controls</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Min/max stays · closed-to-arrival · stop-sells · all channels at once</div>
          </div>
          <Btn variant="primary" icon={Ban}>Stop Sell · All Channels</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <Card title="Active Restrictions" accent={theme.dusk} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Date Range</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Room Type</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Restriction</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Channels</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Reason</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                <td className="py-3 px-5" style={{ color: theme.ink }}>2 May - 6 May</td>
                <td className="py-3 px-3" style={{ color: theme.ink, fontWeight: 500 }}>All Room Types</td>
                <td className="py-3 px-3"><Pill tone="gold" size="sm">Min Stay 3 nights</Pill></td>
                <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>All OTAs</td>
                <td className="py-3 px-5 text-xs italic" style={{ color: theme.inkSoft }}>Easter long weekend · maximize occupancy value</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                <td className="py-3 px-5" style={{ color: theme.ink }}>15 Jul - 30 Jul</td>
                <td className="py-3 px-3" style={{ color: theme.ink, fontWeight: 500 }}>Presidential Suite</td>
                <td className="py-3 px-3"><Pill tone="clay" size="sm">Closed to arrival</Pill></td>
                <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>All channels</td>
                <td className="py-3 px-5 text-xs italic" style={{ color: theme.inkSoft }}>Annual maintenance · refurbishment scheduled</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                <td className="py-3 px-5" style={{ color: theme.ink }}>22 Dec - 02 Jan</td>
                <td className="py-3 px-3" style={{ color: theme.ink, fontWeight: 500 }}>All Room Types</td>
                <td className="py-3 px-3"><Pill tone="gold" size="sm">Min Stay 4 nights</Pill></td>
                <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>All channels</td>
                <td className="py-3 px-5 text-xs italic" style={{ color: theme.inkSoft }}>Christmas / New Year · premium pricing window</td>
              </tr>
              <tr>
                <td className="py-3 px-5" style={{ color: theme.ink }}>Every Sunday</td>
                <td className="py-3 px-3" style={{ color: theme.ink, fontWeight: 500 }}>Family Suite</td>
                <td className="py-3 px-3"><Pill tone="dusk" size="sm">Closed to departure</Pill></td>
                <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>Booking.com, Expedia</td>
                <td className="py-3 px-5 text-xs italic" style={{ color: theme.inkSoft }}>Encourage Sunday-night stays · weekend pickup</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <Card title="Quick Actions · Stop-Sell Controls" accent={theme.clay}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button className="p-4 text-left transition-all" style={{ background: theme.claySoft + '40', border: `1px solid ${theme.clay}30`, borderLeft: `3px solid ${theme.clay}` }}>
              <div className="flex items-center gap-2 mb-2">
                <Ban size={16} style={{ color: theme.clay }} />
                <span className="font-serif" style={{ fontSize: '17px', color: theme.ink, fontWeight: 600 }}>Stop Sell · All Channels</span>
              </div>
              <p className="text-xs" style={{ color: theme.inkSoft }}>Immediately close all rooms across all channels for a date range. Direct bookings remain open.</p>
            </button>
            <button className="p-4 text-left transition-all" style={{ background: theme.goldSoft + '60', border: `1px solid ${theme.gold}30`, borderLeft: `3px solid ${theme.gold}` }}>
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw size={16} style={{ color: theme.gold }} />
                <span className="font-serif" style={{ fontSize: '17px', color: theme.ink, fontWeight: 600 }}>Reopen All Channels</span>
              </div>
              <p className="text-xs" style={{ color: theme.inkSoft }}>Lift all stop-sells. Rates and inventory return to standard distribution.</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const ChannelPerformanceModule = () => {
  const totalRevenue = CHANNELS.reduce((s, c) => s + c.revenue30d, 0);
  const totalCommissionPaid = CHANNELS.reduce((s, c) => s + (c.revenue30d * c.commission), 0);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Channel Performance</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Performance Analysis</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Last 30 days · contribution by channel · commission costs · ADR comparison</div>
          </div>
          <Btn variant="secondary" icon={Download}>Export Report</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <Card title="Channel Performance · Last 30 days" accent={theme.gold} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Channel</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Bookings</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Revenue</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>ADR</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Commission</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Commission Paid</th>
                <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Net Revenue</th>
              </tr>
            </thead>
            <tbody>
              {CHANNELS.sort((a, b) => b.revenue30d - a.revenue30d).map((c, i, arr) => {
                const adr = c.revenue30d / c.bookings30d;
                const commissionPaid = c.revenue30d * c.commission;
                const netRevenue = c.revenue30d - commissionPaid;
                return (
                  <tr key={c.id} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                        <span style={{ color: theme.ink, fontWeight: 500 }}>{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{c.bookings30d}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(c.revenue30d)}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.gold, fontWeight: 600 }}>{cedi(adr)}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: c.commission > 0 ? theme.clay : theme.leaf }}>{c.commission > 0 ? pct(c.commission * 100) : '—'}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.clay }}>{commissionPaid > 0 ? cedi(commissionPaid) : '—'}</td>
                    <td className="py-3 px-5 text-right font-mono" style={{ color: theme.leaf, fontWeight: 700 }}>{cedi(netRevenue)}</td>
                  </tr>
                );
              })}
              <tr style={{ borderTop: `2px solid ${theme.ink}`, background: theme.bgPanelAlt }}>
                <td className="py-3 px-5 font-serif" style={{ color: theme.ink, fontWeight: 700 }}>Total</td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 700 }}>{CHANNELS.reduce((s, c) => s + c.bookings30d, 0)}</td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 700 }}>{cedi(totalRevenue)}</td>
                <td className="py-3 px-3"></td>
                <td className="py-3 px-3"></td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: theme.clay, fontWeight: 700 }}>{cedi(totalCommissionPaid)}</td>
                <td className="py-3 px-5 text-right font-mono" style={{ color: theme.leaf, fontWeight: 700, fontSize: '15px' }}>{cedi(totalRevenue - totalCommissionPaid)}</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.leaf}` }}>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.leaf, letterSpacing: '0.16em', fontWeight: 700 }}>Best Performing Channel</div>
            <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>Booking.com</div>
            <p className="text-sm mt-2" style={{ color: theme.inkSoft }}>
              142 bookings · {cedi(268400)} revenue · highest volume by far. Despite 15% commission, contributes the largest net revenue ({cedi(228140)}). Maintain rate parity strictly.
            </p>
          </div>
          <div className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.gold}` }}>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.16em', fontWeight: 700 }}>Highest ADR Channel</div>
            <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>Direct (thefloatgh.com)</div>
            <p className="text-sm mt-2" style={{ color: theme.inkSoft }}>
              {cedi(2200)} ADR vs ₵1,890 OTA average. Direct bookings carry 0% commission and reflect the brand's premium positioning. Push direct booking incentives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChannelPromotionsModule = () => {
  const promos = [
    { code: 'EASTER25', name: 'Easter Long Weekend', discount: 15, type: 'percentage', applies: '2 May - 6 May 2026', channels: 'Direct only', usage: 8, status: 'active' },
    { code: 'STAY3SAVE', name: 'Stay 3+ Save', discount: 10, type: 'percentage', applies: 'Year-round', channels: 'All channels', usage: 42, status: 'active' },
    { code: 'EARLYBIRD60', name: 'Book 60 days ahead', discount: 12, type: 'percentage', applies: 'Year-round', channels: 'Direct only', usage: 18, status: 'active' },
    { code: 'GHANA50', name: 'Local Resident · 50% off', discount: 50, type: 'percentage', applies: 'Sunday-Thursday', channels: 'Direct only', usage: 24, status: 'active' },
    { code: 'CHRISTMAS26', name: 'Christmas / NYE', discount: 0, type: 'minimum-stay', applies: '22 Dec - 2 Jan', channels: 'All channels', usage: 0, status: 'scheduled' },
    { code: 'SUMMER15', name: 'Summer Family Special', discount: 15, type: 'percentage', applies: '1 Jul - 31 Aug', channels: 'All channels', usage: 0, status: 'scheduled' },
    { code: 'VOLTAFEST', name: 'Volta Trade Fair', discount: 8, type: 'percentage', applies: '15-20 Sep', channels: 'Direct + Booking.com', usage: 0, status: 'draft' },
  ];

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Promotions & Discounts</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Promotions</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{promos.filter(p => p.status === 'active').length} active · {promos.filter(p => p.status === 'scheduled').length} scheduled · {promos.filter(p => p.status === 'draft').length} draft</div>
          </div>
          <Btn variant="primary" icon={Plus}>Create Promotion</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <Card title="All Promotions" accent={theme.hibiscus} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Code</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Name</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Discount</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Applies</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Channels</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Used</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((p, i) => {
                const tone = p.status === 'active' ? 'leaf' : p.status === 'scheduled' ? 'gold' : 'neutral';
                return (
                  <tr key={p.code} style={{ borderBottom: i < promos.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5"><span className="font-mono text-xs" style={{ color: theme.ink, fontWeight: 600 }}>{p.code}</span></td>
                    <td className="py-3 px-3" style={{ color: theme.ink, fontWeight: 500 }}>{p.name}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.gold, fontWeight: 600 }}>{p.type === 'minimum-stay' ? 'Min stay' : `-${p.discount}%`}</td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{p.applies}</td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{p.channels}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{p.usage > 0 ? p.usage : '—'}</td>
                    <td className="py-3 px-5"><Pill tone={tone} size="sm">{p.status}</Pill></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <div className="p-4 flex items-start gap-3" style={{ background: theme.leafSoft + '40', border: `1px solid ${theme.leaf}30`, borderLeft: `3px solid ${theme.leaf}` }}>
          <Sparkles size={16} style={{ color: theme.leaf, marginTop: 2 }} />
          <div className="flex-1 text-sm">
            <span style={{ color: theme.ink, fontWeight: 600 }}>Top performing promo: </span>
            <span style={{ color: theme.inkSoft }}>
              <span className="font-mono" style={{ color: theme.gold, fontWeight: 600 }}>STAY3SAVE</span> has driven 42 bookings — your best converting promotion. Consider extending it to all channels and increasing the discount to 12% for shoulder season.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChannelManagerModule = () => {
  const [tab, setTab] = useState('overview');
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'rates', label: 'Rate Calendar', icon: Calendar },
    { id: 'inventory', label: 'Inventory & Restrictions', icon: Hotel },
    { id: 'performance', label: 'Performance', icon: Activity },
    { id: 'promotions', label: 'Promotions', icon: Sparkles },
  ];

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanelAlt, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 flex gap-1 overflow-x-auto">
          {tabs.map(t => {
            const TabIcon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="px-4 py-3 flex items-center gap-2 transition-all whitespace-nowrap"
                style={{ color: active ? theme.ink : theme.inkSoft, fontWeight: active ? 600 : 400, borderBottom: active ? `2px solid ${theme.gold}` : '2px solid transparent', marginBottom: '-1px', fontSize: '13px' }}>
                <TabIcon size={14} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
      {tab === 'overview' && <ChannelOverviewModule />}
      {tab === 'rates' && <ChannelRatesModule />}
      {tab === 'inventory' && <ChannelInventoryModule />}
      {tab === 'performance' && <ChannelPerformanceModule />}
      {tab === 'promotions' && <ChannelPromotionsModule />}
    </div>
  );
};

const GmApp = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  let content;
  
  // Daily
  if (activeNav === 'dashboard') content = <GMDashboard setActiveNav={setActiveNav} />;
  else if (activeNav === 'morning-brief') content = <MorningBriefModule />;
  else if (activeNav === 'arrivals') content = <ArrivalsModule />;
  else if (activeNav === 'rooms') content = <RoomStatusModule />;
  else if (activeNav === 'channels') content = <ChannelManagerModule />;
  else if (activeNav === 'approvals') content = <ApprovalsModule />;
  else if (activeNav === 'procurement') content = <ProcurementModule />;
  // Periodic
  else if (activeNav === 'fb') content = <FBModule />;
  else if (activeNav === 'maintenance') content = <MaintenanceModule />;
  else if (activeNav === 'budget') content = <BudgetModule />;
  else if (activeNav === 'night-audit') content = <NightAuditModule />;
  // Reports
  else if (activeNav === 'reports') content = <GMReportsModule />;
  else content = <GmComingSoon title="Module" />;
  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: theme.bg, fontFamily: '"Inter", system-ui, sans-serif', color: theme.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.rule}; }
      `}</style>
      <GmSidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <GmTopBar />
        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
};


// ============================================================================
// GM · PERIODIC · Jana Kruger
// ============================================================================
const GM_NAV_gmperiodic = [
  { id: 'fb', label: 'F&B Performance', icon: Utensils },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench, badge: 3 },
  { id: 'budget', label: 'Budget vs. Actuals', icon: DollarSign },
  { id: 'night-audit', label: 'Night Audit', icon: Clock },
];
// ============================================================================
// SIDEBAR — General Manager
// ============================================================================
const GmperiodicSidebar = ({ activeNav, setActiveNav }) => (
  <aside className="hidden md:flex w-64 flex-shrink-0 flex-col" style={{ background: theme.navBg, color: '#FBF7EE' }}>
    <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <FloatLogo size="md" />
          <div className="text-[10px] mt-1" style={{ color: theme.gold, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Ghana</div>
        </div>
      </div>
    </div>
    <div className="px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium" style={{ background: theme.gold, color: theme.navBg, fontSize: '13px' }}>JK</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm" style={{ fontWeight: 500 }}>Jana Kruger</div>
          <div className="text-[10px]" style={{ color: theme.gold, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>General Manager</div>
        </div>
      </div>
    </div>
    <nav className="flex-1 px-3 py-3 overflow-y-auto">
      {GM_NAV_gmperiodic.map(item => {
        const Icon = item.icon;
        const active = activeNav === item.id;
        return (
          <button key={item.id} onClick={() => setActiveNav(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all text-sm"
            style={{ background: active ? 'rgba(185,135,64,0.15)' : 'transparent', color: active ? theme.gold : 'rgba(255,255,255,0.75)', borderLeft: active ? `3px solid ${theme.gold}` : '3px solid transparent', fontWeight: active ? 600 : 400 }}>
            <Icon size={15} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: theme.gold, color: theme.navBg, fontWeight: 700 }}>{item.badge}</span>}
          </button>
        );
      })}
    </nav>
    <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span>v1.0</span>
        <button className="hover:text-white"><LogOut size={12} /></button>
      </div>
    </div>
  </aside>
);

const GmperiodicTopBar = () => (
  <div className="flex items-center justify-between pl-16 pr-4 md:px-8 py-3 md:py-4" style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
    <div className="flex items-center gap-3 text-sm" style={{ color: theme.inkSoft }}>
      <Calendar size={14} /><span className="hidden md:inline">Saturday, 25 April 2026
    </span><span className="md:hidden">Sat 25 Apr</span></div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
        <Search size={13} style={{ color: theme.inkMute }} />
        <input placeholder="Search…" className="bg-transparent outline-none text-sm w-48" style={{ color: theme.ink }} />
      </div>
      <button className="relative p-2"><Bell size={15} style={{ color: theme.inkSoft }} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: theme.gold }} /></button>
    </div>
  </div>
);

// MOCK DATA
const WORK_ORDERS = [
  { id: 'WO-340', title: 'AC unit not cooling', location: 'Room 207', priority: 'high', status: 'in_progress', assignee: 'Sipho Dube', reported: '25 Apr 09:14', age: '2h', source: 'Housekeeping', category: 'HVAC', description: 'Guest reported room not cooling. AC unit running but no cold air. Likely refrigerant or compressor.', cost: 850, eta: '26 Apr', linkedRoom: '207', vendor: 'Internal' },
  { id: 'WO-339', title: 'Pendant light flickering', location: 'Lobby', priority: 'low', status: 'open', assignee: null, reported: '24 Apr 16:40', age: '1d', source: 'GM walkthrough', category: 'Electrical', description: 'Center pendant in main lobby flickers intermittently. Bulb or driver suspected.', cost: 0, eta: '28 Apr', linkedRoom: null, vendor: 'Internal' },
  { id: 'WO-338', title: 'Wardrobe door loose', location: 'Room 112', priority: 'med', status: 'open', assignee: 'Sipho Dube', reported: '24 Apr 11:20', age: '1d', source: 'Housekeeping', category: 'Carpentry', description: 'Top hinge of wardrobe door pulled out. Quick fix with longer screws.', cost: 0, eta: '26 Apr', linkedRoom: '112', vendor: 'Internal' },
  { id: 'WO-336', title: 'Walk-in fridge alarm', location: 'Kitchen', priority: 'high', status: 'done', assignee: 'Sipho Dube', reported: '22 Apr 06:12', age: '3d', source: 'Chef Olamide', category: 'Refrigeration', description: 'Temperature alarm triggered overnight. Door seal replaced; logged in HACCP.', cost: 320, eta: 'Done', linkedRoom: null, vendor: 'Volta Cooling Ltd', completed: '22 Apr 14:30' },
  { id: 'WO-334', title: 'Generator not starting', location: 'Plant room', priority: 'high', status: 'in_progress', assignee: 'Power Solutions GH', reported: '23 Apr 18:00', age: '2d', source: 'Auto-detected', category: 'Generator', description: 'Standby genset failed to auto-start during ECG outage. Battery suspected.', cost: 2400, eta: '26 Apr', linkedRoom: null, vendor: 'Power Solutions GH' },
  { id: 'WO-332', title: 'Pool pump replacement', location: 'Pool deck', priority: 'med', status: 'scheduled', assignee: 'Akwaaba Pools', reported: '20 Apr 10:00', age: '5d', source: 'Preventive', category: 'Pool & Plant', description: 'Pump approaching end of life — replacement scheduled per PO-1140.', cost: 5800, eta: '28 Apr', linkedRoom: null, vendor: 'Akwaaba Pools' },
  { id: 'WO-331', title: 'Wi-Fi dropout — Floor 3', location: 'Floor 3', priority: 'low', status: 'open', assignee: null, reported: '23 Apr 09:00', age: '2d', source: 'Guest complaint', category: 'IT', description: 'Suite guests reporting weak signal. Likely AP placement.', cost: 0, eta: '30 Apr', linkedRoom: null, vendor: 'Internal IT' },
  { id: 'WO-329', title: 'Lakeside deck plank loose', location: 'Lakeside deck', priority: 'med', status: 'done', assignee: 'Sipho Dube', reported: '19 Apr 14:00', age: '6d', source: 'GM walkthrough', category: 'Carpentry', description: 'Two planks near steps lifted. Re-fastened with marine-grade screws.', cost: 80, eta: 'Done', linkedRoom: null, vendor: 'Internal', completed: '20 Apr 11:00' },
];

const PM_SCHEDULE = [
  { id: 'PM-014', asset: 'Generator (Cummins 200kVA)', task: 'Monthly load test + oil check', frequency: 'Monthly', last: '03 Apr 2026', next: '03 May 2026', status: 'on-track', owner: 'Power Solutions GH' },
  { id: 'PM-021', asset: 'HVAC — Floor 2 chillers', task: 'Quarterly service', frequency: 'Quarterly', last: '15 Feb 2026', next: '15 May 2026', status: 'on-track', owner: 'Volta Cooling Ltd' },
  { id: 'PM-008', asset: 'Pool filtration system', task: 'Weekly chemistry + filter check', frequency: 'Weekly', last: '21 Apr 2026', next: '28 Apr 2026', status: 'due-soon', owner: 'Akwaaba Pools' },
  { id: 'PM-031', asset: 'Fire alarm panel', task: 'Annual certification', frequency: 'Annual', last: '12 Sep 2025', next: '12 Sep 2026', status: 'on-track', owner: 'Ghana Fire Service' },
  { id: 'PM-019', asset: 'Lift — main building', task: 'Semi-annual safety inspection', frequency: '6-monthly', last: '04 Nov 2025', next: '04 May 2026', status: 'due-soon', owner: 'Otis Ghana' },
  { id: 'PM-024', asset: 'Kitchen extraction hoods', task: 'Deep clean + filter swap', frequency: 'Quarterly', last: '08 Jan 2026', next: '08 Apr 2026', status: 'overdue', owner: 'Internal' },
  { id: 'PM-012', asset: 'Water borehole pump', task: 'Quarterly inspection', frequency: 'Quarterly', last: '18 Feb 2026', next: '18 May 2026', status: 'on-track', owner: 'Internal' },
  { id: 'PM-027', asset: 'Solar inverter array', task: 'Quarterly performance audit', frequency: 'Quarterly', last: '10 Feb 2026', next: '10 May 2026', status: 'on-track', owner: 'Solar Taxi GH' },
];

const ASSETS = [
  { id: 'AST-001', name: 'Cummins 200kVA Genset', category: 'Power', location: 'Plant room', purchaseDate: '12 Mar 2022', value: 380000, condition: 'good', warranty: '2027' },
  { id: 'AST-014', name: 'Trane Chiller — North', category: 'HVAC', location: 'Roof, north wing', purchaseDate: '04 Jun 2021', value: 240000, condition: 'fair', warranty: '2026' },
  { id: 'AST-022', name: 'Pool filtration unit', category: 'Pool & Plant', location: 'Pool plant room', purchaseDate: '20 Aug 2020', value: 85000, condition: 'fair', warranty: 'Expired' },
  { id: 'AST-008', name: 'Otis Lift', category: 'Lifting', location: 'Main lobby', purchaseDate: '01 Sep 2018', value: 420000, condition: 'good', warranty: '2028' },
  { id: 'AST-035', name: 'Solar PV Array (40kW)', category: 'Power', location: 'East roof', purchaseDate: '15 Nov 2023', value: 520000, condition: 'excellent', warranty: '2033' },
  { id: 'AST-019', name: 'Kitchen Combi Oven', category: 'Kitchen', location: 'Main kitchen', purchaseDate: '08 Apr 2022', value: 95000, condition: 'good', warranty: '2027' },
];

const UTILITY_TREND = [
  { month: 'Nov', power: 82, water: 1240 },
  { month: 'Dec', power: 91, water: 1380 },
  { month: 'Jan', power: 78, water: 1180 },
  { month: 'Feb', power: 84, water: 1240 },
  { month: 'Mar', power: 88, water: 1320 },
  { month: 'Apr', power: 92, water: 1410 },
];

const BUDGET_LINES = [
  // Revenue
  { line: 'Rooms Revenue', category: 'revenue', actual: 3840000, budget: 3600000, lastYear: 3420000 },
  { line: 'F&B Revenue', category: 'revenue', actual: 1180000, budget: 1100000, lastYear: 980000 },
  { line: 'Spa & Wellness', category: 'revenue', actual: 184000, budget: 220000, lastYear: 195000 },
  { line: 'Other Revenue', category: 'revenue', actual: 31000, budget: 30000, lastYear: 28000 },
  // Cost of sales
  { line: 'F&B Cost of Sales', category: 'cogs', actual: -370000, budget: -330000, lastYear: -310000 },
  { line: 'Spa Supplies', category: 'cogs', actual: -42000, budget: -50000, lastYear: -45000 },
  { line: 'Guest Amenities', category: 'cogs', actual: -68000, budget: -65000, lastYear: -62000 },
  // Payroll
  { line: 'Front of House', category: 'payroll', actual: -540000, budget: -520000, lastYear: -495000 },
  { line: 'Housekeeping', category: 'payroll', actual: -380000, budget: -380000, lastYear: -360000 },
  { line: 'Kitchen & F&B', category: 'payroll', actual: -480000, budget: -460000, lastYear: -440000 },
  { line: 'Maintenance & Engineering', category: 'payroll', actual: -120000, budget: -120000, lastYear: -115000 },
  { line: 'Admin & Management', category: 'payroll', actual: -180000, budget: -175000, lastYear: -170000 },
  // OpEx
  { line: 'Utilities (ECG + Water)', category: 'opex', actual: -195000, budget: -180000, lastYear: -168000 },
  { line: 'OTA Commission', category: 'opex', actual: -148000, budget: -140000, lastYear: -125000 },
  { line: 'Marketing', category: 'opex', actual: -85000, budget: -100000, lastYear: -78000 },
  { line: 'Repairs & Maintenance', category: 'opex', actual: -92000, budget: -85000, lastYear: -88000 },
  { line: 'Cleaning Supplies', category: 'opex', actual: -38000, budget: -40000, lastYear: -36000 },
  { line: 'Linen & Laundry', category: 'opex', actual: -62000, budget: -60000, lastYear: -58000 },
  { line: 'Insurance', category: 'opex', actual: -45000, budget: -45000, lastYear: -42000 },
  { line: 'Licenses & Compliance', category: 'opex', actual: -22000, budget: -22000, lastYear: -22000 },
];

const CATEGORY_META = {
  revenue: { label: 'Revenue', color: theme.leaf, soft: theme.leafSoft },
  cogs: { label: 'Cost of Sales', color: theme.hibiscus, soft: theme.hibiscusSoft },
  payroll: { label: 'Payroll', color: theme.dusk, soft: theme.duskSoft },
  opex: { label: 'Operating Expenses', color: theme.clay, soft: theme.claySoft },
};

const MONTHLY_TREND = [
  { month: 'Nov', actual: 4280, budget: 4200 },
  { month: 'Dec', actual: 5680, budget: 5400 },
  { month: 'Jan', actual: 4140, budget: 4000 },
  { month: 'Feb', actual: 4680, budget: 4400 },
  { month: 'Mar', actual: 5040, budget: 4800 },
  { month: 'Apr', actual: 5235, budget: 4950 },
];

const AUDIT_STEPS = [
  { id: 1, label: 'Close pending postings', status: 'done', detail: 'All POS terminals closed · 247 transactions · ₵ 28,450', time: '02:42' },
  { id: 2, label: 'Roll forward room rates', status: 'done', detail: 'Daily room rate posted to 28 in-house folios', time: '02:48' },
  { id: 3, label: 'Apply no-show charges', status: 'done', detail: '1 no-show identified — David Chen (R1049) · ₵ 1,240 charged', time: '02:54' },
  { id: 4, label: 'Mark departures vs. ledger', status: 'done', detail: '6 departures reconciled · 2 outstanding balances flagged', time: '02:58' },
  { id: 5, label: 'Close cashier shifts', status: 'done', detail: '3 shifts closed · over/under: ₵ +24 (immaterial)', time: '03:00' },
  { id: 6, label: 'Reconcile bank deposits', status: 'done', detail: 'Card settlements ₵ 184,200 · MoMo ₵ 12,400 · Cash to safe ₵ 8,420', time: '03:02' },
  { id: 7, label: 'Generate daily reports', status: 'done', detail: 'Manager Flash · Revenue · Occupancy · F&B · Trial balance · all generated', time: '03:02' },
  { id: 8, label: 'Email pack to GM', status: 'done', detail: 'Sent to jana.kruger@thefloat.com at 03:02', time: '03:02' },
];

const AUDIT_FLASH = {
  occupancy: 87.5,
  occupancyChange: 4.2,
  rooms: { sold: 28, available: 32 },
  adr: 1840,
  revpar: 1610,
  totalRevenue: 187500,
  rooms_revenue: 124000,
  fb_revenue: 38000,
  bar_revenue: 18500,
  spa_revenue: 7000,
  fbCostPct: 31.4,
};

const RECENT_AUDITS = [
  { date: '25 Apr 2026', time: '03:02', status: 'success', revenue: 187500, occupancy: 87.5, runtime: '20m' },
  { date: '24 Apr 2026', time: '02:58', status: 'success', revenue: 165400, occupancy: 78.1, runtime: '18m' },
  { date: '23 Apr 2026', time: '03:14', status: 'warning', revenue: 142200, occupancy: 71.9, runtime: '32m', note: 'POS sync delay — reconciled manually' },
  { date: '22 Apr 2026', time: '02:51', status: 'success', revenue: 158600, occupancy: 75.0, runtime: '17m' },
  { date: '21 Apr 2026', time: '02:55', status: 'success', revenue: 134800, occupancy: 68.8, runtime: '19m' },
  { date: '20 Apr 2026', time: '02:48', status: 'success', revenue: 142400, occupancy: 71.9, runtime: '16m' },
];


// MODULES
const FBModule = ({ initialTab }) => {
  const [tab, setTab] = useState(initialTab || 'overview');
  React.useEffect(() => { if (initialTab) setTab(initialTab); }, [initialTab]);
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'outlets', label: 'Outlets', icon: Utensils },
    { id: 'menu', label: 'Menu Engineering', icon: ChefHat },
  ];
  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Food & Beverage</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>F&B Performance</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Five outlets, lakeside service · Live</div>
          </div>
          <Btn variant="primary" icon={Download}>Export A4</Btn>
        </div>
        <div className="px-8 flex gap-1" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
          {tabs.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className="flex items-center gap-2 px-4 py-3 text-sm transition-all"
                style={{ color: active ? theme.ink : theme.inkSoft, fontWeight: active ? 600 : 400, borderBottom: active ? `2px solid ${theme.gold}` : '2px solid transparent', marginBottom: '-1px' }}>
                <Icon size={14} />{t.label}
              </button>
            );
          })}
        </div>
      </div>
      {tab === 'overview' && (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard kpi={FB_KPIS.revenue} format="currency" />
            <KpiCard kpi={FB_KPIS.costPct} format="percent" />
            <KpiCard kpi={FB_KPIS.covers} format="number" />
            <KpiCard kpi={FB_KPIS.avgSpend} format="currency" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-2">
              <Card title="Revenue & F&B Cost % — Last 7 Days" accent={theme.gold}>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={WEEK_REV}>
                    <CartesianGrid strokeDasharray="2 4" stroke={theme.rule} vertical={false} />
                    <XAxis dataKey="day" stroke={theme.inkMute} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="l" stroke={theme.inkMute} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => '₵' + (v / 1000).toFixed(0) + 'k'} />
                    <YAxis yAxisId="r" orientation="right" stroke={theme.inkMute} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v + '%'} domain={[20, 40]} />
                    <Tooltip formatter={(v, n) => n === 'costPct' ? v + '%' : cedi(v)} contentStyle={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, fontSize: 12 }} />
                    <Bar yAxisId="l" dataKey="actual" fill={theme.gold} name="Actual" radius={[2, 2, 0, 0]} />
                    <Bar yAxisId="l" dataKey="budget" fill={theme.sand} name="Budget" radius={[2, 2, 0, 0]} />
                    <Line yAxisId="r" type="monotone" dataKey="costPct" stroke={theme.teal} strokeWidth={2} name="F&B Cost %" dot={{ r: 4, fill: theme.teal }} />
                    <ReferenceLine yAxisId="r" y={30} stroke={theme.clay} strokeDasharray="4 4" />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <Card title="Top Sellers" accent={theme.hibiscus}>
              <div className="space-y-3">
                {TOP_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="font-serif" style={{ fontSize: '18px', color: theme.gold, width: 22, fontWeight: 500 }}>{String(i + 1).padStart(2, '0')}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate" style={{ color: theme.ink, fontWeight: 500 }}>{item.name}</div>
                      <div className="text-xs" style={{ color: theme.inkMute }}>{item.sold} sold</div>
                    </div>
                    <div className="text-sm font-mono" style={{ color: theme.ink }}>{cedi(item.revenue)}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
      {tab === 'outlets' && (
        <div className="px-4 md:px-8 py-4 md:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {OUTLETS.map(o => (
              <div key={o.id} className="p-6" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderTop: `3px solid ${o.color}` }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-serif text-xl" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>{o.name}</div>
                  </div>
                  <Pill tone={o.vsBudget > 0 ? 'leaf' : 'clay'}>{o.vsBudget > 0 ? '+' : ''}{o.vsBudget}% vs budget</Pill>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div><div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Revenue</div><div className="font-serif text-xl" style={{ color: theme.ink }}>{cedi(o.revenue)}</div></div>
                  <div><div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Covers</div><div className="font-serif text-xl" style={{ color: theme.ink }}>{o.covers}</div></div>
                  <div><div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Cost %</div><div className="font-serif text-xl" style={{ color: o.costPct > 32 ? theme.clay : theme.ink }}>{pct(o.costPct)}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === 'menu' && (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <Card title="Menu Engineering — Quadrants" accent={theme.gold}>
            <p className="text-sm mb-4" style={{ color: theme.inkSoft }}>Each dish positioned by popularity and contribution margin. Bubble size = units sold.</p>
            <div style={{ position: 'relative', height: 360 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 30, left: 30 }}>
                  <CartesianGrid strokeDasharray="2 4" stroke={theme.rule} />
                  <XAxis type="number" dataKey="popularity" domain={[0, 100]} stroke={theme.inkMute} tick={{ fontSize: 11 }} label={{ value: 'Popularity →', position: 'insideBottom', offset: -10, fontSize: 11, fill: theme.inkSoft }} />
                  <YAxis type="number" dataKey="margin" domain={[40, 100]} stroke={theme.inkMute} tick={{ fontSize: 11 }} label={{ value: '↑ Margin', angle: -90, position: 'insideLeft', fontSize: 11, fill: theme.inkSoft }} />
                  <ZAxis type="number" dataKey="sold" range={[80, 400]} />
                  <ReferenceLine x={50} stroke={theme.inkSoft} strokeDasharray="4 4" />
                  <ReferenceLine y={70} stroke={theme.inkSoft} strokeDasharray="4 4" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, fontSize: 12 }} />
                  {['Stars', 'Plowhorses', 'Puzzles', 'Dogs'].map(cat => {
                    const colors = { Stars: theme.gold, Plowhorses: theme.teal, Puzzles: theme.dusk, Dogs: theme.clay };
                    return <Scatter key={cat} name={cat} data={MENU_MATRIX.filter(m => m.category === cat)} fill={colors[cat]} />;
                  })}
                </ScatterChart>
              </ResponsiveContainer>
              <div className="absolute pointer-events-none" style={{ top: 28, right: 60, color: theme.gold, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em' }}>STARS</div>
              <div className="absolute pointer-events-none" style={{ top: 28, left: 60, color: theme.dusk, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em' }}>PUZZLES</div>
              <div className="absolute pointer-events-none" style={{ bottom: 50, right: 60, color: theme.teal, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em' }}>PLOWHORSES</div>
              <div className="absolute pointer-events-none" style={{ bottom: 50, left: 60, color: theme.clay, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em' }}>DOGS</div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAINTENANCE & ENGINEERING
// ============================================================================
const MaintenanceModule = () => {
  const [tab, setTab] = useState('workorders');
  const [drawerWO, setDrawerWO] = useState(null);
  const [filterPriority, setFilterPriority] = useState('all');

  const tabs = [
    { id: 'workorders', label: 'Work Orders', icon: Wrench },
    { id: 'pm', label: 'Preventive Maintenance', icon: RefreshCw },
    { id: 'assets', label: 'Asset Register', icon: Package },
    { id: 'utilities', label: 'Energy & Utilities', icon: Activity },
  ];

  const wos = WORK_ORDERS.filter(w => filterPriority === 'all' || w.priority === filterPriority);
  const stats = {
    open: WORK_ORDERS.filter(w => w.status === 'open').length,
    inProgress: WORK_ORDERS.filter(w => w.status === 'in_progress').length,
    high: WORK_ORDERS.filter(w => w.priority === 'high' && w.status !== 'done').length,
    overdue: PM_SCHEDULE.filter(p => p.status === 'overdue').length,
  };

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Engineering & Estate</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Maintenance</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Saturday, 25 April 2026 · Live work orders, PM schedule, assets</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="ghost" icon={RefreshCw}>Refresh</Btn>
            <Btn variant="primary" icon={Plus}>New Work Order</Btn>
          </div>
        </div>
        <div className="px-8 flex gap-1" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
          {tabs.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className="flex items-center gap-2 px-4 py-3 text-sm transition-all"
                style={{ color: active ? theme.ink : theme.inkSoft, fontWeight: active ? 600 : 400, borderBottom: active ? `2px solid ${theme.gold}` : '2px solid transparent', marginBottom: '-1px' }}>
                <Icon size={14} />{t.label}
              </button>
            );
          })}
        </div>
      </div>

      {tab === 'workorders' && (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiTile label="Open Work Orders" value={stats.open} sublabel="awaiting assignment" icon={AlertCircle} tone={theme.gold} />
            <KpiTile label="In Progress" value={stats.inProgress} sublabel="being worked on" icon={Activity} tone={theme.teal} />
            <KpiTile label="High Priority" value={stats.high} sublabel="needing immediate attention" icon={AlertTriangle} tone={theme.clay} />
            <KpiTile label="PM Overdue" value={stats.overdue} sublabel="across all assets" icon={Clock3} tone={theme.clay} />
          </div>

          <div className="flex items-center gap-3 p-3" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
            <span className="text-[10px] uppercase mr-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Priority</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'high', label: 'High' },
              { id: 'med', label: 'Medium' },
              { id: 'low', label: 'Low' },
            ].map(p => (
              <button key={p.id} onClick={() => setFilterPriority(p.id)} className="text-xs px-3 py-1.5"
                style={{
                  background: filterPriority === p.id ? theme.ink : 'transparent',
                  color: filterPriority === p.id ? theme.bgPanel : theme.inkSoft,
                  border: `1px solid ${filterPriority === p.id ? theme.ink : theme.rule}`,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                {p.label}
              </button>
            ))}
            <div className="flex-1" />
            <span className="text-xs" style={{ color: theme.inkMute }}>{wos.length} of {WORK_ORDERS.length} work orders</span>
          </div>

          <div className="space-y-3">
            {wos.map(wo => {
              const statusTone = wo.status === 'done' ? 'leaf' : wo.status === 'in_progress' ? 'teal' : wo.status === 'scheduled' ? 'dusk' : 'gold';
              const statusLabel = wo.status === 'in_progress' ? 'In progress' : wo.status === 'done' ? 'Completed' : wo.status === 'scheduled' ? 'Scheduled' : 'Open';
              const priorityTone = wo.priority === 'high' ? 'clay' : wo.priority === 'med' ? 'gold' : 'neutral';
              const borderColor = wo.priority === 'high' ? theme.clay : wo.priority === 'med' ? theme.gold : theme.rule;
              return (
                <div key={wo.id} onClick={() => setDrawerWO(wo)}
                  className="grid grid-cols-12 gap-4 p-4 cursor-pointer transition-all hover:translate-y-[-1px]"
                  style={{
                    background: theme.bgPanel,
                    border: `1px solid ${theme.rule}`,
                    borderLeft: `3px solid ${borderColor}`,
                    opacity: wo.status === 'done' ? 0.6 : 1,
                  }}>
                  <div className="col-span-1">
                    <div className="font-mono text-xs" style={{ color: theme.inkSoft }}>{wo.id}</div>
                    <div className="text-[10px] mt-1" style={{ color: theme.inkMute }}>{wo.age} ago</div>
                  </div>
                  <div className="col-span-4 border-l pl-4" style={{ borderColor: theme.ruleSoft }}>
                    <div className="font-serif" style={{ fontSize: '17px', color: theme.ink, letterSpacing: '-0.01em', fontWeight: 500 }}>{wo.title}</div>
                    <div className="text-xs mt-0.5 flex items-center gap-2" style={{ color: theme.inkSoft }}>
                      <MapPin size={10} />{wo.location}
                      <span>·</span><span>{wo.category}</span>
                    </div>
                    <div className="text-xs mt-1" style={{ color: theme.inkMute }}>Reported {wo.reported} via {wo.source}</div>
                  </div>
                  <div className="col-span-2 border-l pl-4" style={{ borderColor: theme.ruleSoft }}>
                    <div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Assignee</div>
                    {wo.assignee ? (
                      <>
                        <div className="text-sm" style={{ color: theme.ink, fontWeight: 500 }}>{wo.assignee}</div>
                        <div className="text-[11px]" style={{ color: theme.inkMute }}>{wo.vendor}</div>
                      </>
                    ) : (
                      <Pill tone="gold">Unassigned</Pill>
                    )}
                  </div>
                  <div className="col-span-2 border-l pl-4" style={{ borderColor: theme.ruleSoft }}>
                    <div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>ETA · Cost</div>
                    <div className="text-sm" style={{ color: theme.ink }}>{wo.eta}</div>
                    {wo.cost > 0 && <div className="text-[11px] font-mono" style={{ color: theme.inkSoft }}>{cedi(wo.cost)} est.</div>}
                  </div>
                  <div className="col-span-2 border-l pl-4 flex flex-col items-start justify-center gap-1.5" style={{ borderColor: theme.ruleSoft }}>
                    <Pill tone={priorityTone} size="sm">{wo.priority} priority</Pill>
                    <Pill tone={statusTone} size="sm">{statusLabel}</Pill>
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <ChevronRight size={16} style={{ color: theme.inkMute }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'pm' && (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiTile label="Total PM Tasks" value={PM_SCHEDULE.length} sublabel="across all assets" icon={ClipboardList} />
            <KpiTile label="Due This Week" value={PM_SCHEDULE.filter(p => p.status === 'due-soon').length} sublabel="schedule attention" icon={Clock3} tone={theme.gold} />
            <KpiTile label="Overdue" value={PM_SCHEDULE.filter(p => p.status === 'overdue').length} sublabel="action required" icon={AlertTriangle} tone={theme.clay} />
            <KpiTile label="Compliance" value="92%" sublabel="last 90 days" icon={CircleCheck} tone={theme.leaf} />
          </div>
          <Card title="Preventive Maintenance Schedule" accent={theme.teal} padded={false}
            action={<Btn variant="primary" size="sm" icon={Plus}>Add PM Task</Btn>}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Asset · Task</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Frequency</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Last Done</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Next Due</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Owner</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
                  <th className="text-right py-3 px-5"></th>
                </tr>
              </thead>
              <tbody>
                {PM_SCHEDULE.map((p, i) => {
                  const tone = p.status === 'overdue' ? 'clay' : p.status === 'due-soon' ? 'gold' : 'leaf';
                  const label = p.status === 'overdue' ? 'Overdue' : p.status === 'due-soon' ? 'Due soon' : 'On track';
                  return (
                    <tr key={p.id} style={{ borderBottom: i < PM_SCHEDULE.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                      <td className="py-3 px-5">
                        <div style={{ color: theme.ink, fontWeight: 500 }}>{p.asset}</div>
                        <div className="text-xs mt-0.5" style={{ color: theme.inkSoft }}>{p.task}</div>
                        <div className="font-mono text-[10px] mt-0.5" style={{ color: theme.inkMute }}>{p.id}</div>
                      </td>
                      <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{p.frequency}</td>
                      <td className="py-3 px-3 text-xs" style={{ color: theme.inkMute }}>{p.last}</td>
                      <td className="py-3 px-3" style={{ color: p.status === 'overdue' ? theme.clay : theme.ink, fontWeight: p.status !== 'on-track' ? 600 : 400 }}>{p.next}</td>
                      <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{p.owner}</td>
                      <td className="py-3 px-3"><Pill tone={tone} size="sm">{label}</Pill></td>
                      <td className="py-3 px-5 text-right">
                        {p.status === 'overdue' && <Btn variant="primary" size="sm">Schedule Now</Btn>}
                        {p.status === 'due-soon' && <Btn variant="secondary" size="sm">Schedule</Btn>}
                        {p.status === 'on-track' && <Btn variant="ghost" size="sm" icon={Eye}>View</Btn>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === 'assets' && (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiTile label="Total Assets" value={ASSETS.length} sublabel="tracked in register" icon={Package} />
            <KpiTile label="Total Value" value={cedi(ASSETS.reduce((s, a) => s + a.value, 0))} sublabel="net book value" icon={DollarSign} tone={theme.gold} />
            <KpiTile label="Warranty Expired" value={ASSETS.filter(a => a.warranty === 'Expired').length} sublabel="renewal needed" icon={AlertTriangle} tone={theme.clay} />
            <KpiTile label="Excellent / Good" value={ASSETS.filter(a => a.condition === 'excellent' || a.condition === 'good').length} sublabel={`of ${ASSETS.length} assets`} icon={CircleCheck} tone={theme.leaf} />
          </div>
          <Card title="Asset Register" accent={theme.dusk} padded={false}
            action={<Btn variant="primary" size="sm" icon={Plus}>Register Asset</Btn>}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Asset</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Category · Location</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Purchase</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Value</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Condition</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Warranty</th>
                </tr>
              </thead>
              <tbody>
                {ASSETS.map((a, i) => {
                  const condTone = a.condition === 'excellent' ? 'leaf' : a.condition === 'good' ? 'teal' : a.condition === 'fair' ? 'gold' : 'clay';
                  const warrantyExpired = a.warranty === 'Expired';
                  return (
                    <tr key={a.id} style={{ borderBottom: i < ASSETS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                      <td className="py-3 px-5">
                        <div style={{ color: theme.ink, fontWeight: 500 }}>{a.name}</div>
                        <div className="font-mono text-[10px] mt-0.5" style={{ color: theme.inkMute }}>{a.id}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-sm" style={{ color: theme.ink }}>{a.category}</div>
                        <div className="text-xs" style={{ color: theme.inkMute }}>{a.location}</div>
                      </td>
                      <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{a.purchaseDate}</td>
                      <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(a.value)}</td>
                      <td className="py-3 px-3"><Pill tone={condTone} size="sm">{a.condition}</Pill></td>
                      <td className="py-3 px-3">
                        {warrantyExpired
                          ? <Pill tone="clay" size="sm">Expired</Pill>
                          : <span className="text-xs" style={{ color: theme.inkSoft }}>Until {a.warranty}</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === 'utilities' && (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiTile label="Power · This Month" value="92 MWh" sublabel="+4.5% vs last month" icon={Activity} tone={theme.gold} />
            <KpiTile label="Water · This Month" value="1,410 m³" sublabel="+6.8% vs last month" icon={Activity} tone={theme.teal} />
            <KpiTile label="Solar Generated" value="14 MWh" sublabel="15% of consumption" icon={Leaf} tone={theme.leaf} />
            <KpiTile label="Cost This Month" value={cedi(48200)} sublabel="ECG + water utility" icon={DollarSign} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Power Consumption · Last 6 Months" accent={theme.gold}>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={UTILITY_TREND}>
                  <defs><linearGradient id="ug1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={theme.gold} stopOpacity={0.35} /><stop offset="100%" stopColor={theme.gold} stopOpacity={0.02} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="2 4" stroke={theme.rule} vertical={false} />
                  <XAxis dataKey="month" stroke={theme.inkMute} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis stroke={theme.inkMute} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v + ' MWh'} />
                  <Tooltip formatter={(v) => v + ' MWh'} contentStyle={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, fontSize: 12 }} />
                  <Area type="monotone" dataKey="power" stroke={theme.gold} strokeWidth={2} fill="url(#ug1)" name="Consumption" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Water Consumption · Last 6 Months" accent={theme.teal}>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={UTILITY_TREND}>
                  <defs><linearGradient id="ug2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={theme.teal} stopOpacity={0.35} /><stop offset="100%" stopColor={theme.teal} stopOpacity={0.02} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="2 4" stroke={theme.rule} vertical={false} />
                  <XAxis dataKey="month" stroke={theme.inkMute} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis stroke={theme.inkMute} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v + ' m³'} />
                  <Tooltip formatter={(v) => v + ' m³'} contentStyle={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, fontSize: 12 }} />
                  <Area type="monotone" dataKey="water" stroke={theme.teal} strokeWidth={2} fill="url(#ug2)" name="Consumption" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>
          <div className="p-5 flex items-start gap-3" style={{ background: theme.bgPanelAlt, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.leaf}` }}>
            <Leaf size={16} style={{ color: theme.leaf, marginTop: 2 }} />
            <div className="text-sm" style={{ color: theme.inkSoft }}>
              <span className="font-serif" style={{ color: theme.ink }}>Sustainability note: </span>
              Solar array offset 14 MWh this month — equivalent to ₵ 8,400 saved on grid electricity. Lakeside resort certification audit is scheduled for August.
            </div>
          </div>
        </div>
      )}

      {drawerWO && (
        <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(21,32,31,0.4)' }} onClick={() => setDrawerWO(null)}>
          <div className="w-[480px] h-full overflow-y-auto" style={{ background: theme.bgPanel, borderLeft: `1px solid ${theme.rule}` }} onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5" style={{ background: drawerWO.priority === 'high' ? theme.claySoft : theme.bgPanelAlt, borderBottom: `1px solid ${theme.rule}` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[10px] uppercase" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>{drawerWO.id}</div>
                  <div className="font-serif mt-1" style={{ fontSize: '24px', color: theme.ink, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{drawerWO.title}</div>
                  <div className="text-xs mt-1 flex items-center gap-2" style={{ color: theme.inkSoft }}>
                    <MapPin size={11} />{drawerWO.location} · {drawerWO.category}
                  </div>
                </div>
                <button onClick={() => setDrawerWO(null)} className="p-1.5"><X size={18} /></button>
              </div>
              <div className="flex items-center gap-2">
                <Pill tone={drawerWO.priority === 'high' ? 'clay' : drawerWO.priority === 'med' ? 'gold' : 'neutral'}>{drawerWO.priority} priority</Pill>
                <Pill tone={drawerWO.status === 'done' ? 'leaf' : drawerWO.status === 'in_progress' ? 'teal' : 'gold'}>
                  {drawerWO.status === 'in_progress' ? 'In progress' : drawerWO.status === 'done' ? 'Completed' : drawerWO.status === 'scheduled' ? 'Scheduled' : 'Open'}
                </Pill>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Description</div>
                <p className="text-sm leading-relaxed" style={{ color: theme.ink }}>{drawerWO.description}</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <InfoTile label="Reported" value={drawerWO.reported} />
                <InfoTile label="Source" value={drawerWO.source} />
                <InfoTile label="Assignee" value={drawerWO.assignee || 'Unassigned'} />
                <InfoTile label="Vendor" value={drawerWO.vendor} />
                <InfoTile label="ETA" value={drawerWO.eta} />
                <InfoTile label="Estimated cost" value={drawerWO.cost > 0 ? cedi(drawerWO.cost) : '—'} />
                {drawerWO.linkedRoom && <InfoTile label="Linked room" value={`Room ${drawerWO.linkedRoom} (OOO)`} />}
                {drawerWO.completed && <InfoTile label="Completed" value={drawerWO.completed} />}
              </div>
              {drawerWO.status !== 'done' && (
                <div className="space-y-2">
                  <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Actions</div>
                  {!drawerWO.assignee && <Btn variant="primary" size="md" icon={UserCircle}>Assign Technician</Btn>}
                  {drawerWO.status === 'open' && drawerWO.assignee && <Btn variant="primary" size="md" icon={ArrowRight}>Mark In Progress</Btn>}
                  {drawerWO.status === 'in_progress' && <Btn variant="primary" size="md" icon={Check}>Mark Complete</Btn>}
                  <div className="flex gap-2">
                    <Btn variant="secondary" size="md" icon={MessageSquare}>Add Note</Btn>
                    <Btn variant="ghost" size="md" icon={Camera}>Attach Photo</Btn>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BudgetModule = () => {
  const [view, setView] = useState('summary');

  const totals = useMemo(() => {
    const sumBy = (cat) => BUDGET_LINES.filter(l => l.category === cat).reduce((acc, l) => ({
      actual: acc.actual + l.actual,
      budget: acc.budget + l.budget,
      lastYear: acc.lastYear + l.lastYear,
    }), { actual: 0, budget: 0, lastYear: 0 });
    const revenue = sumBy('revenue');
    const cogs = sumBy('cogs');
    const payroll = sumBy('payroll');
    const opex = sumBy('opex');
    const grossProfit = {
      actual: revenue.actual + cogs.actual,
      budget: revenue.budget + cogs.budget,
      lastYear: revenue.lastYear + cogs.lastYear,
    };
    const gop = {
      actual: revenue.actual + cogs.actual + payroll.actual + opex.actual,
      budget: revenue.budget + cogs.budget + payroll.budget + opex.budget,
      lastYear: revenue.lastYear + cogs.lastYear + payroll.lastYear + opex.lastYear,
    };
    return { revenue, cogs, payroll, opex, grossProfit, gop };
  }, []);

  const variance = (actual, budget) => actual - budget;
  const variancePct = (actual, budget) => budget !== 0 ? ((actual - budget) / Math.abs(budget)) * 100 : 0;

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Finance · Operational</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Budget vs. Actuals</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>April 2026 — Month to date · Variance analysis & trends</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, borderRadius: '2px' }}>
              {['MTD', 'QTD', 'YTD'].map(p => (
                <button key={p} className="px-3 py-1.5 text-xs font-medium"
                  style={{
                    background: p === 'MTD' ? theme.ink : 'transparent',
                    color: p === 'MTD' ? theme.bgPanel : theme.inkSoft,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>{p}</button>
              ))}
            </div>
            <Btn variant="secondary" icon={Printer}>Print</Btn>
            <Btn variant="primary" icon={Download}>Export A4</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        {/* Top metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Total Revenue" value={cedi(totals.revenue.actual)}
            sublabel={`+${variancePct(totals.revenue.actual, totals.revenue.budget).toFixed(1)}% vs budget`}
            icon={TrendingUp} tone={theme.leaf} />
          <KpiTile label="Gross Profit" value={cedi(totals.grossProfit.actual)}
            sublabel={`${cedi(Math.abs(variance(totals.grossProfit.actual, totals.grossProfit.budget)))} ${variance(totals.grossProfit.actual, totals.grossProfit.budget) >= 0 ? 'over' : 'under'}`}
            icon={DollarSign} tone={theme.gold} />
          <KpiTile label="GOP" value={cedi(totals.gop.actual)}
            sublabel={`${variancePct(totals.gop.actual, totals.gop.budget).toFixed(1)}% vs budget`}
            icon={Award} tone={theme.teal} />
          <KpiTile label="GOP Margin" value={pct((totals.gop.actual / totals.revenue.actual) * 100)}
            sublabel="of total revenue" icon={Percent} tone={theme.dusk} />
        </div>

        {/* Trend chart */}
        <Card title="Revenue Trend — Actual vs. Budget · Last 6 Months" accent={theme.gold}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={MONTHLY_TREND}>
              <CartesianGrid strokeDasharray="2 4" stroke={theme.rule} vertical={false} />
              <XAxis dataKey="month" stroke={theme.inkMute} tick={{ fontSize: 11, fill: theme.inkSoft }} axisLine={false} tickLine={false} />
              <YAxis stroke={theme.inkMute} tick={{ fontSize: 11, fill: theme.inkSoft }} axisLine={false} tickLine={false} tickFormatter={(v) => '₵' + v + 'k'} />
              <Tooltip contentStyle={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderRadius: 0, fontSize: 12 }} formatter={(v) => '₵' + v + 'k'} />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              <Bar dataKey="actual" fill={theme.gold} name="Actual" radius={[2, 2, 0, 0]} />
              <Bar dataKey="budget" fill={theme.sand} name="Budget" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Category summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(CATEGORY_META).map(([key, meta]) => {
            const t = totals[key];
            const v = variance(t.actual, t.budget);
            const vpct = variancePct(t.actual, t.budget);
            // For costs (negative numbers), favorable means actual is less negative than budget (variance > 0)
            // For revenue, favorable means actual > budget (variance > 0)
            const favorable = v >= 0;
            return (
              <div key={key} className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderTop: `3px solid ${meta.color}` }}>
                <div className="text-[10px] uppercase mb-2" style={{ color: meta.color, letterSpacing: '0.18em', fontWeight: 700 }}>{meta.label}</div>
                <div className="font-serif" style={{ fontSize: '24px', color: theme.ink, letterSpacing: '-0.02em' }}>
                  {cedi(Math.abs(t.actual))}
                </div>
                <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>Budget {cedi(Math.abs(t.budget))}</div>
                <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
                  <span className="text-xs" style={{ color: theme.inkMute }}>Variance</span>
                  <span className="text-xs flex items-center gap-1" style={{ color: favorable ? theme.leaf : theme.clay, fontWeight: 600 }}>
                    {favorable ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                    {Math.abs(vpct).toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed P&L table */}
        <Card title="P&L Detail · April 2026 (Month to Date)" accent={theme.dusk} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Line Item</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Actual</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Budget</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Variance ₵</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Variance %</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Last Year</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Flag</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(CATEGORY_META).map(([key, meta]) => {
                const lines = BUDGET_LINES.filter(l => l.category === key);
                const subtotal = totals[key];
                return (
                  <React.Fragment key={key}>
                    <tr style={{ background: meta.soft + '50', borderBottom: `1px solid ${theme.rule}` }}>
                      <td className="py-2.5 px-5 text-[10px] uppercase" style={{ color: meta.color, letterSpacing: '0.16em', fontWeight: 700 }} colSpan={7}>
                        {meta.label}
                      </td>
                    </tr>
                    {lines.map(l => {
                      const v = variance(l.actual, l.budget);
                      const vpct = variancePct(l.actual, l.budget);
                      const favorable = key === 'revenue' ? v >= 0 : v >= 0; // for cost lines, less negative = favorable
                      const isMaterial = Math.abs(vpct) > 5;
                      return (
                        <tr key={l.line} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                          <td className="py-2.5 px-5" style={{ color: theme.ink }}>{l.line}</td>
                          <td className="py-2.5 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 500 }}>
                            {l.actual < 0 ? '(' + fmt(Math.abs(l.actual / 1000)) + 'k)' : fmt(l.actual / 1000) + 'k'}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono" style={{ color: theme.inkSoft }}>
                            {l.budget < 0 ? '(' + fmt(Math.abs(l.budget / 1000)) + 'k)' : fmt(l.budget / 1000) + 'k'}
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono" style={{ color: favorable ? theme.leaf : theme.clay, fontWeight: 600 }}>
                            {v >= 0 ? '+' : '−'}{fmt(Math.abs(v / 1000))}k
                          </td>
                          <td className="py-2.5 px-3 text-right" style={{ color: favorable ? theme.leaf : theme.clay, fontWeight: 600 }}>
                            {v >= 0 ? '+' : ''}{vpct.toFixed(1)}%
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono text-xs" style={{ color: theme.inkMute }}>
                            {l.lastYear < 0 ? '(' + fmt(Math.abs(l.lastYear / 1000)) + 'k)' : fmt(l.lastYear / 1000) + 'k'}
                          </td>
                          <td className="py-2.5 px-5">
                            {isMaterial && (favorable
                              ? <Pill tone="leaf" size="sm">Favorable</Pill>
                              : <Pill tone="clay" size="sm">Unfavorable</Pill>)}
                          </td>
                        </tr>
                      );
                    })}
                    <tr style={{ borderBottom: `2px solid ${meta.color}`, background: meta.soft + '30' }}>
                      <td className="py-2.5 px-5 font-serif" style={{ color: theme.ink, fontWeight: 600 }}>{meta.label} Total</td>
                      <td className="py-2.5 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 700 }}>
                        {subtotal.actual < 0 ? '(' + fmt(Math.abs(subtotal.actual / 1000)) + 'k)' : fmt(subtotal.actual / 1000) + 'k'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono" style={{ color: theme.inkSoft, fontWeight: 600 }}>
                        {subtotal.budget < 0 ? '(' + fmt(Math.abs(subtotal.budget / 1000)) + 'k)' : fmt(subtotal.budget / 1000) + 'k'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono" style={{ color: variance(subtotal.actual, subtotal.budget) >= 0 ? theme.leaf : theme.clay, fontWeight: 700 }}>
                        {variance(subtotal.actual, subtotal.budget) >= 0 ? '+' : '−'}{fmt(Math.abs(variance(subtotal.actual, subtotal.budget) / 1000))}k
                      </td>
                      <td className="py-2.5 px-3 text-right" style={{ color: variance(subtotal.actual, subtotal.budget) >= 0 ? theme.leaf : theme.clay, fontWeight: 700 }}>
                        {variancePct(subtotal.actual, subtotal.budget) >= 0 ? '+' : ''}{variancePct(subtotal.actual, subtotal.budget).toFixed(1)}%
                      </td>
                      <td colSpan={2}></td>
                    </tr>
                  </React.Fragment>
                );
              })}
              {/* Final GOP row */}
              <tr style={{ borderTop: `2px solid ${theme.ink}`, background: theme.bgPanelAlt }}>
                <td className="py-3 px-5 font-serif" style={{ color: theme.ink, fontWeight: 700, fontSize: '15px' }}>Gross Operating Profit (GOP)</td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: theme.gold, fontWeight: 700, fontSize: '15px' }}>
                  {fmt(totals.gop.actual / 1000)}k
                </td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: theme.inkSoft, fontWeight: 600 }}>
                  {fmt(totals.gop.budget / 1000)}k
                </td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: variance(totals.gop.actual, totals.gop.budget) >= 0 ? theme.leaf : theme.clay, fontWeight: 700, fontSize: '15px' }}>
                  {variance(totals.gop.actual, totals.gop.budget) >= 0 ? '+' : '−'}{fmt(Math.abs(variance(totals.gop.actual, totals.gop.budget) / 1000))}k
                </td>
                <td className="py-3 px-3 text-right" style={{ color: variance(totals.gop.actual, totals.gop.budget) >= 0 ? theme.leaf : theme.clay, fontWeight: 700, fontSize: '15px' }}>
                  {variancePct(totals.gop.actual, totals.gop.budget) >= 0 ? '+' : ''}{variancePct(totals.gop.actual, totals.gop.budget).toFixed(1)}%
                </td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: theme.inkMute }}>
                  {fmt(totals.gop.lastYear / 1000)}k
                </td>
                <td className="py-3 px-5"></td>
              </tr>
            </tbody>
          </table>
        </Card>

        {/* Notes & flags */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 flex items-start gap-3" style={{ background: theme.bgPanelAlt, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.leaf}` }}>
            <CircleCheck size={16} style={{ color: theme.leaf, marginTop: 2 }} />
            <div className="text-sm" style={{ color: theme.inkSoft }}>
              <span className="font-serif" style={{ color: theme.ink }}>Wins this month: </span>
              Rooms revenue +6.7% vs budget driven by direct bookings. Marketing spend 15% under, freeing budget for Q3 campaigns.
            </div>
          </div>
          <div className="p-5 flex items-start gap-3" style={{ background: theme.bgPanelAlt, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.clay}` }}>
            <AlertTriangle size={16} style={{ color: theme.clay, marginTop: 2 }} />
            <div className="text-sm" style={{ color: theme.inkSoft }}>
              <span className="font-serif" style={{ color: theme.ink }}>Watch list: </span>
              F&B Cost of Sales 12% over (₵40k unfavorable) — links to F&B Cost % flag. Utilities +8% over due to ECG tariff increase. Spa revenue 16% under budget.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// NIGHT AUDIT
// ============================================================================
const NightAuditModule = () => {
  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>End-of-Day Reconciliation</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Night Audit</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Latest run: 25 Apr 2026 at 03:02 · Completed in 20 minutes</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="ghost" icon={Clock}>History</Btn>
            <Btn variant="secondary" icon={Printer}>Print Pack</Btn>
            <Btn variant="primary" icon={Download}>Download A4</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        {/* Status banner */}
        <div className="p-5 flex items-center gap-4" style={{ background: theme.leafSoft + '60', border: `1px solid ${theme.leaf}40`, borderLeft: `3px solid ${theme.leaf}` }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: theme.leaf, color: '#FBF7EE' }}>
            <CircleCheck size={24} />
          </div>
          <div className="flex-1">
            <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>Audit completed successfully</div>
            <div className="text-sm mt-0.5" style={{ color: theme.inkSoft }}>
              All 8 steps passed. Daily Manager&apos;s Flash emailed to GM at 03:02. Next audit: tomorrow at 02:30.
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Runtime</div>
            <div className="font-serif" style={{ fontSize: '24px', color: theme.ink, letterSpacing: '-0.02em' }}>20 min</div>
          </div>
        </div>

        {/* Daily Manager's Flash — this is the deliverable */}
        <Card title="Daily Manager's Flash · 25 April 2026" accent={theme.gold}>
          <div className="grid grid-cols-4 gap-4 mb-5">
            <div>
              <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Occupancy</div>
              <div className="font-serif" style={{ fontSize: '28px', color: theme.ink, letterSpacing: '-0.02em' }}>{pct(AUDIT_FLASH.occupancy)}</div>
              <div className="text-xs mt-1" style={{ color: theme.leaf }}>+{AUDIT_FLASH.occupancyChange}pp vs yesterday</div>
              <div className="text-[10px] mt-0.5" style={{ color: theme.inkMute }}>{AUDIT_FLASH.rooms.sold} of {AUDIT_FLASH.rooms.available} rooms</div>
            </div>
            <div>
              <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>ADR</div>
              <div className="font-serif" style={{ fontSize: '28px', color: theme.ink, letterSpacing: '-0.02em' }}>{cedi(AUDIT_FLASH.adr)}</div>
              <div className="text-xs mt-1" style={{ color: theme.leaf }}>+6.1% vs yesterday</div>
            </div>
            <div>
              <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>RevPAR</div>
              <div className="font-serif" style={{ fontSize: '28px', color: theme.ink, letterSpacing: '-0.02em' }}>{cedi(AUDIT_FLASH.revpar)}</div>
              <div className="text-xs mt-1" style={{ color: theme.leaf }}>+10.6% vs yesterday</div>
            </div>
            <div>
              <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Total Revenue</div>
              <div className="font-serif" style={{ fontSize: '28px', color: theme.gold, letterSpacing: '-0.02em' }}>{cedi(AUDIT_FLASH.totalRevenue)}</div>
              <div className="text-xs mt-1" style={{ color: theme.leaf }}>+12.3% vs budget</div>
            </div>
          </div>
          <div className="pt-5" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
            <div className="text-[10px] uppercase mb-3" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Revenue Breakdown</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Rooms', value: AUDIT_FLASH.rooms_revenue, color: theme.teal },
                { label: 'Restaurant', value: AUDIT_FLASH.fb_revenue, color: theme.gold },
                { label: 'Bar', value: AUDIT_FLASH.bar_revenue, color: theme.hibiscus },
                { label: 'Spa & Other', value: AUDIT_FLASH.spa_revenue, color: theme.dusk },
              ].map(d => (
                <div key={d.label} className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}`, borderLeft: `3px solid ${d.color}` }}>
                  <div className="text-xs" style={{ color: theme.inkSoft }}>{d.label}</div>
                  <div className="font-serif text-lg mt-1" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>{cedi(d.value)}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Audit checklist */}
        <Card title="Audit Steps · Run 25 Apr 02:42 — 03:02" accent={theme.teal}>
          <div className="space-y-2">
            {AUDIT_STEPS.map(step => (
              <div key={step.id} className="flex items-start gap-4 p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}`, borderLeft: `3px solid ${theme.leaf}` }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: theme.leafSoft, color: theme.leaf }}>
                  <Check size={14} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono" style={{ color: theme.inkMute }}>Step {step.id}</span>
                    <span className="text-sm" style={{ color: theme.ink, fontWeight: 500 }}>{step.label}</span>
                  </div>
                  <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>{step.detail}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono" style={{ color: theme.inkMute }}>{step.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Reconciliation summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Cashier Reconciliation" accent={theme.dusk} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Shift</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Cashier</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Total</th>
                  <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Variance</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { shift: 'Morning', cashier: 'Amani M.', total: 48200, variance: 0 },
                  { shift: 'Afternoon', cashier: 'Kwame A.', total: 92400, variance: 24 },
                  { shift: 'Night', cashier: 'Esi O.', total: 64200, variance: 0 },
                ].map((s, i) => (
                  <tr key={s.shift} style={{ borderBottom: i < 2 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5" style={{ color: theme.ink, fontWeight: 500 }}>{s.shift}</td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{s.cashier}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(s.total)}</td>
                    <td className="py-3 px-5 text-right font-mono" style={{ color: s.variance === 0 ? theme.leaf : theme.gold, fontWeight: 600 }}>
                      {s.variance === 0 ? '₵ 0' : `+${cedi(s.variance)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card title="Bank Deposit Reconciliation" accent={theme.teal} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Method</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Amount</th>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { method: 'Card settlements', amount: 184200, status: 'reconciled' },
                  { method: 'MTN MoMo', amount: 12400, status: 'reconciled' },
                  { method: 'Vodafone Cash', amount: 4800, status: 'reconciled' },
                  { method: 'Cash to safe', amount: 8420, status: 'reconciled' },
                  { method: 'City Ledger (TechAfrica)', amount: 9450, status: 'invoiced' },
                ].map((r, i) => (
                  <tr key={r.method} style={{ borderBottom: i < 4 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5" style={{ color: theme.ink, fontWeight: 500 }}>{r.method}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(r.amount)}</td>
                    <td className="py-3 px-5">
                      <Pill tone={r.status === 'reconciled' ? 'leaf' : 'dusk'} size="sm">{r.status}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Audit history */}
        <Card title="Recent Audits · Last 7 Days" accent={theme.dusk} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Date</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Run Time</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Revenue</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Occupancy</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Runtime</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
                <th className="text-right py-3 px-5"></th>
              </tr>
            </thead>
            <tbody>
              {RECENT_AUDITS.map((a, i) => (
                <tr key={a.date} style={{ borderBottom: i < RECENT_AUDITS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5">
                    <div style={{ color: theme.ink, fontWeight: 500 }}>{a.date}</div>
                    <div className="text-[11px]" style={{ color: theme.inkMute }}>Started {a.time}</div>
                  </td>
                  <td className="py-3 px-3 text-xs font-mono" style={{ color: theme.inkSoft }}>{a.time}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(a.revenue)}</td>
                  <td className="py-3 px-3 text-right" style={{ color: theme.ink }}>{pct(a.occupancy)}</td>
                  <td className="py-3 px-3 text-right text-xs" style={{ color: theme.inkMute }}>{a.runtime}</td>
                  <td className="py-3 px-3">
                    {a.status === 'success'
                      ? <Pill tone="leaf" size="sm"><Check size={9} /> Success</Pill>
                      : <Pill tone="gold" size="sm"><AlertTriangle size={9} /> Warning</Pill>}
                    {a.note && <div className="text-[11px] mt-1 italic" style={{ color: theme.inkSoft }}>{a.note}</div>}
                  </td>
                  <td className="py-3 px-5 text-right">
                    <Btn variant="ghost" size="sm" icon={Eye}>View Pack</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// APPROVALS WORKFLOW
// ============================================================================

const GmperiodicComingSoon = ({ title }) => (
  <div className="p-4 md:p-6" style={{ background: theme.bg, minHeight: '100%' }}>
    <SectionHeader overline="Module" title={title} />
    <div className="p-12 text-center" style={{ background: theme.bgPanel, border: `1px dashed ${theme.rule}` }}>
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ background: theme.tealSoft, color: theme.teal }}><Sparkles size={20} /></div>
      <p className="font-serif text-lg mb-2" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Module defined in the BRD</p>
      <p className="text-sm" style={{ color: theme.inkSoft }}>To be built in the next sprint.</p>
    </div>
  </div>
);

// ============================================================================
// APP
// ============================================================================
const GmperiodicApp = () => {
  const [activeNav, setActiveNav] = useState('fb');
  let content;
  
  if (activeNav === 'fb') content = <FBModule />;
  else if (activeNav === 'maintenance') content = <MaintenanceModule />;
  else if (activeNav === 'budget') content = <BudgetModule />;
  else if (activeNav === 'night-audit') content = <NightAuditModule />;
  else content = <GmperiodicComingSoon title="Module" />;
  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: theme.bg, fontFamily: '"Inter", system-ui, sans-serif', color: theme.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.rule}; }
      `}</style>
      <GmperiodicSidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <GmperiodicTopBar />
        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
};


// ============================================================================
// GM · REPORTS · Jana Kruger
// ============================================================================
const GM_NAV_gmreports = [
  { id: 'reports', label: 'Reports Library', icon: FileText },
];
// ============================================================================
// SIDEBAR — General Manager
// ============================================================================
const GmreportsSidebar = ({ activeNav, setActiveNav }) => (
  <aside className="hidden md:flex w-64 flex-shrink-0 flex-col" style={{ background: theme.navBg, color: '#FBF7EE' }}>
    <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <FloatLogo size="md" />
          <div className="text-[10px] mt-1" style={{ color: theme.gold, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Ghana</div>
        </div>
      </div>
    </div>
    <div className="px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium" style={{ background: theme.gold, color: theme.navBg, fontSize: '13px' }}>JK</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm" style={{ fontWeight: 500 }}>Jana Kruger</div>
          <div className="text-[10px]" style={{ color: theme.gold, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>General Manager</div>
        </div>
      </div>
    </div>
    <nav className="flex-1 px-3 py-3 overflow-y-auto">
      {GM_NAV_gmreports.map(item => {
        const Icon = item.icon;
        const active = activeNav === item.id;
        return (
          <button key={item.id} onClick={() => setActiveNav(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all text-sm"
            style={{ background: active ? 'rgba(185,135,64,0.15)' : 'transparent', color: active ? theme.gold : 'rgba(255,255,255,0.75)', borderLeft: active ? `3px solid ${theme.gold}` : '3px solid transparent', fontWeight: active ? 600 : 400 }}>
            <Icon size={15} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: theme.gold, color: theme.navBg, fontWeight: 700 }}>{item.badge}</span>}
          </button>
        );
      })}
    </nav>
    <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span>v1.0</span>
        <button className="hover:text-white"><LogOut size={12} /></button>
      </div>
    </div>
  </aside>
);

const GmreportsTopBar = () => (
  <div className="flex items-center justify-between pl-16 pr-4 md:px-8 py-3 md:py-4" style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
    <div className="flex items-center gap-3 text-sm" style={{ color: theme.inkSoft }}>
      <Calendar size={14} /><span className="hidden md:inline">Saturday, 25 April 2026
    </span><span className="md:hidden">Sat 25 Apr</span></div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
        <Search size={13} style={{ color: theme.inkMute }} />
        <input placeholder="Search…" className="bg-transparent outline-none text-sm w-48" style={{ color: theme.ink }} />
      </div>
      <button className="relative p-2"><Bell size={15} style={{ color: theme.inkSoft }} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: theme.gold }} /></button>
    </div>
  </div>
);

// MOCK DATA
const GM_QUICK_REPORTS = [
  { id: 'qr-1', name: "Today's Manager Flash", description: 'Single-page snapshot — occupancy, ADR, RevPAR, F&B, by-department revenue. Auto-emailed at 06:00.', frequency: 'Daily', icon: BarChart3, color: theme.gold, lastRun: 'Today, 06:00', autopilot: true },
  { id: 'qr-2', name: 'Arrivals & Departures', description: "Today's expected arrivals and departures with VIP flags, special requests, and folio status.", frequency: 'On-demand', icon: Bed, color: theme.teal, lastRun: 'Today, 09:14', autopilot: false },
  { id: 'qr-3', name: 'Room Status', description: 'Live snapshot of all 32 rooms with occupancy and HK status.', frequency: 'On-demand', icon: Hotel, color: theme.dusk, lastRun: 'Today, 08:42', autopilot: false },
  { id: 'qr-4', name: 'F&B Daily Summary', description: 'Yesterday\'s F&B performance by outlet, top sellers, cost % by category.', frequency: 'Daily', icon: Utensils, color: theme.hibiscus, lastRun: 'Today, 06:00', autopilot: true },
  { id: 'qr-5', name: 'Night Audit Pack', description: 'Full audit trail from last night — cashier, bank deposits, no-shows, system close.', frequency: 'Daily', icon: Clock, color: theme.leaf, lastRun: 'Today, 03:02', autopilot: true },
  { id: 'qr-6', name: 'Housekeeping Productivity', description: 'Avg. minutes per room by attendant, room turnaround time, OOO/OOS analysis.', frequency: 'Weekly', icon: Bath, color: theme.teal, lastRun: 'Mon, 21 Apr', autopilot: true },
];

const SCHEDULED_REPORTS = [
  { id: 'sr-1', name: "Daily Manager's Flash", recipient: 'jana.kruger@thefloat.com', schedule: 'Daily · 06:00', nextRun: 'Tomorrow 06:00', format: 'PDF', active: true },
  { id: 'sr-2', name: 'Daily Revenue Report', recipient: 'jana.kruger@thefloat.com, adriaan@thefloat.com', schedule: 'Daily · 06:00', nextRun: 'Tomorrow 06:00', format: 'PDF + XLSX', active: true },
  { id: 'sr-3', name: 'F&B Daily Summary', recipient: 'jana.kruger@thefloat.com, yaa.owusu@thefloat.com', schedule: 'Daily · 06:00', nextRun: 'Tomorrow 06:00', format: 'PDF', active: true },
  { id: 'sr-4', name: 'Night Audit Pack', recipient: 'jana.kruger@thefloat.com, adriaan@thefloat.com', schedule: 'Daily · 03:00', nextRun: 'Tomorrow 03:00', format: 'PDF', active: true },
  { id: 'sr-5', name: 'F&B Cost Analysis', recipient: 'yaa.owusu@thefloat.com, jana.kruger@thefloat.com', schedule: 'Weekly · Mondays 07:00', nextRun: 'Mon 28 Apr', format: 'PDF + XLSX', active: true },
  { id: 'sr-6', name: 'Housekeeping Productivity', recipient: 'akua.mensah@thefloat.com, jana.kruger@thefloat.com', schedule: 'Weekly · Mondays 07:00', nextRun: 'Mon 28 Apr', format: 'PDF', active: true },
  { id: 'sr-7', name: 'Maintenance & PM Compliance', recipient: 'jana.kruger@thefloat.com, sipho.dube@thefloat.com', schedule: 'Monthly · 5th of month', nextRun: '5 May 2026', format: 'PDF', active: true },
  { id: 'sr-8', name: 'Budget vs. Actuals', recipient: 'jana.kruger@thefloat.com, charles.botha@thefloat.com', schedule: 'Monthly · 5th of month', nextRun: '5 May 2026', format: 'PDF + XLSX', active: true },
  { id: 'sr-9', name: 'Rate Mix Report', recipient: 'amani.mlangeni@thefloat.com, jana.kruger@thefloat.com', schedule: 'Weekly · Mondays', nextRun: 'Mon 28 Apr', format: 'XLSX', active: false },
];

const RECENT_RUNS = [
  { name: "Daily Manager's Flash", time: 'Today, 06:00', status: 'success', recipients: 1, format: 'PDF', size: '184 KB' },
  { name: 'Night Audit Pack', time: 'Today, 03:02', status: 'success', recipients: 2, format: 'PDF', size: '512 KB' },
  { name: 'F&B Daily Summary', time: 'Today, 06:00', status: 'success', recipients: 2, format: 'PDF', size: '241 KB' },
  { name: 'Daily Revenue Report', time: 'Today, 06:00', status: 'success', recipients: 2, format: 'PDF + XLSX', size: '386 KB' },
  { name: 'Arrivals & Departures', time: 'Today, 09:14', status: 'success', recipients: 1, format: 'PDF', size: '128 KB', manual: true },
  { name: 'F&B Cost Analysis', time: 'Mon, 21 Apr 07:00', status: 'success', recipients: 2, format: 'PDF + XLSX', size: '625 KB' },
  { name: 'Housekeeping Productivity', time: 'Mon, 21 Apr 07:00', status: 'warning', recipients: 2, format: 'PDF', size: '198 KB', note: 'PMS sync delayed by 3 min' },
];

const REPORT_BUILDER_FIELDS = [
  { category: 'Time', items: ['Date range', 'Day of week', 'Time of day', 'Compare to last year', 'Compare to budget'] },
  { category: 'Revenue', items: ['Rooms revenue', 'F&B revenue', 'Spa revenue', 'Other revenue', 'Total revenue', 'ADR', 'RevPAR', 'GOPPAR'] },
  { category: 'Occupancy', items: ['Rooms sold', 'Occupancy %', 'By room type', 'By rate plan', 'By source', 'Length of stay'] },
  { category: 'Guest', items: ['Guest count', 'VIP %', 'Repeat guest %', 'Nationality mix', 'Source of business'] },
];


// MODULES

// ============================================================================
// EXPANDED REPORTS CATALOG — 28 reports across 5 categories
// ============================================================================
const REPORT_CATALOG = [
  // === OPERATIONAL (8) ===
  { id: 'rep-op-flash', category: 'Operational', name: "Today's Manager Flash", description: 'Single-page snapshot — occupancy, ADR, RevPAR, F&B cost, by-department revenue', frequency: 'Daily 06:00', lastRun: '25 Apr 06:00', subscribers: 4, autoEmail: true, popular: true, icon: 'BarChart3' },
  { id: 'rep-op-arr',   category: 'Operational', name: 'Arrivals & Departures', description: "Today's expected arrivals and departures with VIP flags, special requests, folio status", frequency: 'Daily 07:00', lastRun: '25 Apr 07:00', subscribers: 5, autoEmail: true, popular: true, icon: 'Bed' },
  { id: 'rep-op-rooms', category: 'Operational', name: 'Room Status', description: 'Live snapshot of all 32 rooms with occupancy and HK status', frequency: 'On-demand', lastRun: '24 Apr 14:22', subscribers: 3, autoEmail: false, popular: true, icon: 'Hotel' },
  { id: 'rep-op-house', category: 'Operational', name: 'In-House Guests', description: 'Currently in-house guests with stay history, balance, and special needs', frequency: 'On-demand', lastRun: '24 Apr 18:00', subscribers: 2, autoEmail: false, icon: 'Users' },
  { id: 'rep-op-cancel', category: 'Operational', name: 'Cancellations & No-shows', description: 'Cancelled bookings and no-shows with revenue impact', frequency: 'Weekly Mon', lastRun: '21 Apr', subscribers: 3, autoEmail: true, icon: 'Ban' },
  { id: 'rep-op-blocks', category: 'Operational', name: 'Group Block Status', description: 'Active group bookings and corporate accounts with pickup performance', frequency: 'Weekly Mon', lastRun: '21 Apr', subscribers: 2, autoEmail: true, icon: 'Users' },
  { id: 'rep-op-fcst',  category: 'Operational', name: 'Forecasted Occupancy 14-day', description: 'Pickup-weighted forecast with confidence intervals', frequency: 'Daily 06:00', lastRun: '25 Apr 06:00', subscribers: 3, autoEmail: true, icon: 'TrendingUp' },
  { id: 'rep-op-walkin', category: 'Operational', name: 'Walk-in Conversion', description: 'Walk-in inquiries vs converted bookings, by source and time of day', frequency: 'Monthly', lastRun: '01 Apr', subscribers: 2, autoEmail: true, icon: 'Activity' },
  // === FINANCIAL (7) ===
  { id: 'rep-fin-fb',   category: 'Financial', name: 'F&B Summary', description: 'F&B by outlet, by daypart with covers, average check, theoretical-vs-actual cost', frequency: 'Daily 11:00', lastRun: '25 Apr 11:00', subscribers: 6, autoEmail: true, popular: true, icon: 'Utensils' },
  { id: 'rep-fin-revdept', category: 'Financial', name: 'Revenue by Department', description: 'All revenue lines with budget comparison and variance alerts', frequency: 'Daily 11:00', lastRun: '25 Apr 11:00', subscribers: 4, autoEmail: true, popular: true, icon: 'DollarSign' },
  { id: 'rep-fin-daily', category: 'Financial', name: 'Daily Revenue Report', description: 'Detailed daily revenue with breakouts by service charge, complimentary, allowances', frequency: 'Daily 11:00', lastRun: '25 Apr 11:00', subscribers: 3, autoEmail: true, icon: 'Receipt' },
  { id: 'rep-fin-folio', category: 'Financial', name: 'Folio Audit', description: 'Daily audit of all guest folios with charge posting trace', frequency: 'Daily 03:00', lastRun: '25 Apr 03:00', subscribers: 2, autoEmail: true, icon: 'FileText' },
  { id: 'rep-fin-cash', category: 'Financial', name: 'Cashier Shift Reports', description: 'End-of-shift cash and card reconciliation per cashier', frequency: 'Per shift', lastRun: '24 Apr 23:30', subscribers: 4, autoEmail: false, icon: 'CreditCard' },
  { id: 'rep-fin-gltrace', category: 'Financial', name: 'GL Posting Trace', description: 'PMS to GL posting reconciliation with unposted items', frequency: 'Daily 03:30', lastRun: '25 Apr 03:30', subscribers: 2, autoEmail: true, icon: 'FileSignature' },
  { id: 'rep-fin-folio-out', category: 'Financial', name: 'Outstanding Folios', description: 'Open folios with city-ledger transfers and direct billing balances', frequency: 'Weekly Mon', lastRun: '21 Apr', subscribers: 2, autoEmail: true, icon: 'AlertCircle' },
  // === MARKETING (4) ===
  { id: 'rep-mkt-mix',  category: 'Marketing', name: 'Channel Mix Analysis', description: 'Bookings by channel · ADR · commission cost · contribution margin', frequency: 'Weekly Mon', lastRun: '21 Apr', subscribers: 3, autoEmail: true, popular: true, icon: 'Globe' },
  { id: 'rep-mkt-pace', category: 'Marketing', name: 'Booking Pace', description: 'On-the-books pickup pace vs same time last year, broken by segment', frequency: 'Weekly Mon', lastRun: '21 Apr', subscribers: 3, autoEmail: true, icon: 'Activity' },
  { id: 'rep-mkt-geo',  category: 'Marketing', name: 'Geographic Source', description: 'Bookings by guest origin country/region with revenue contribution', frequency: 'Monthly', lastRun: '01 Apr', subscribers: 2, autoEmail: true, icon: 'MapPin' },
  { id: 'rep-mkt-lead', category: 'Marketing', name: 'Lead Time Analysis', description: 'Days-to-arrival distribution by channel and segment', frequency: 'Monthly', lastRun: '01 Apr', subscribers: 2, autoEmail: true, icon: 'Calendar' },
  // === STATUTORY (5) ===
  { id: 'rep-stat-vat', category: 'Statutory', name: 'VAT Return Summary', description: 'VAT output and input by tax period, ready for Ghana Revenue Authority', frequency: 'Monthly · 5th', lastRun: '05 Apr', subscribers: 2, autoEmail: true, popular: true, icon: 'FileSignature' },
  { id: 'rep-stat-tour', category: 'Statutory', name: 'Tourism Levy', description: 'Tourism Levy collected and payable by month', frequency: 'Monthly · 5th', lastRun: '05 Apr', subscribers: 2, autoEmail: true, icon: 'FileSignature' },
  { id: 'rep-stat-wage', category: 'Statutory', name: 'Statutory Wage Report', description: 'PAYE, SSNIT employer + employee, employee count by tax bracket', frequency: 'Monthly · 5th', lastRun: '05 Apr', subscribers: 2, autoEmail: true, icon: 'Users' },
  { id: 'rep-stat-occ', category: 'Statutory', name: 'Occupancy Tax Return', description: 'Volta Region tourism occupancy tax · monthly remittance', frequency: 'Monthly · 5th', lastRun: '05 Apr', subscribers: 2, autoEmail: true, icon: 'Receipt' },
  { id: 'rep-stat-gra', category: 'Statutory', name: 'GRA Submission Pack', description: 'Bundled monthly tax filing pack for GRA portal upload', frequency: 'Monthly · 12th', lastRun: '12 Apr', subscribers: 1, autoEmail: false, icon: 'FileText' },
  // === HOUSEKEEPING (2) ===
  { id: 'rep-hk-prod',  category: 'Housekeeping', name: 'HK Productivity', description: 'Rooms cleaned per attendant per day with average minutes per room', frequency: 'Daily 11:00', lastRun: '25 Apr 11:00', subscribers: 3, autoEmail: true, popular: true, icon: 'Bath' },
  { id: 'rep-hk-mini', category: 'Housekeeping', name: 'Mini-Bar & Linen Variance', description: 'Mini-bar postings vs inventory · linen losses', frequency: 'Weekly Mon', lastRun: '21 Apr', subscribers: 2, autoEmail: true, icon: 'Package' },
  // === CUSTOM (2) ===
  { id: 'rep-cust-saved', category: 'Custom', name: 'Saved Custom Reports', description: 'Reports built with the Custom Builder · saved to your library', frequency: 'On-demand', lastRun: '20 Apr', subscribers: 2, autoEmail: false, icon: 'Star' },
  { id: 'rep-cust-sched', category: 'Custom', name: 'Scheduled Custom', description: 'Custom reports running on a schedule · email distribution', frequency: 'Various', lastRun: '21 Apr', subscribers: 2, autoEmail: true, icon: 'Calendar' },
];

const REPORT_CATEGORY_META = {
  'Operational': { tone: 'gold', icon: 'LayoutDashboard' },
  'Financial':   { tone: 'teal', icon: 'DollarSign' },
  'Marketing':   { tone: 'dusk', icon: 'TrendingUp' },
  'Statutory':   { tone: 'clay', icon: 'FileSignature' },
  'Housekeeping':{ tone: 'leaf', icon: 'Bath' },
  'Custom':      { tone: 'gold', icon: 'Star' },
};

const ReportsLibraryView = ({ runReport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterAuto, setFilterAuto] = useState('all');

  const categories = ['all', ...Object.keys(REPORT_CATEGORY_META)];

  const filtered = REPORT_CATALOG.filter(r => {
    if (filterCategory !== 'all' && r.category !== filterCategory) return false;
    if (filterAuto === 'auto' && !r.autoEmail) return false;
    if (filterAuto === 'manual' && r.autoEmail) return false;
    if (searchTerm && !r.name.toLowerCase().includes(searchTerm.toLowerCase()) && !r.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Group by category
  const grouped = filtered.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {});

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Search + Filters */}
      <div className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 px-3 py-2" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
              <Search size={14} style={{ color: theme.inkMute }} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search 28 reports by name or description..."
                className="bg-transparent outline-none text-sm flex-1"
                style={{ color: theme.ink }}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="opacity-60 hover:opacity-100">
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Delivery</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'auto', label: 'Auto-emailed' },
              { id: 'manual', label: 'On-demand' },
            ].map(f => (
              <button key={f.id} onClick={() => setFilterAuto(f.id)} className="text-xs px-2.5 py-1"
                style={{ background: filterAuto === f.id ? theme.ink : 'transparent', color: filterAuto === f.id ? theme.bgPanel : theme.inkSoft, border: `1px solid ${filterAuto === f.id ? theme.ink : theme.rule}`, letterSpacing: '0.04em' }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-[10px] uppercase mr-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Category</span>
          {categories.map(c => {
            const isActive = filterCategory === c;
            const count = c === 'all' ? REPORT_CATALOG.length : REPORT_CATALOG.filter(r => r.category === c).length;
            return (
              <button key={c} onClick={() => setFilterCategory(c)} className="text-xs px-2.5 py-1"
                style={{ background: isActive ? theme.ink : 'transparent', color: isActive ? theme.bgPanel : theme.inkSoft, border: `1px solid ${isActive ? theme.ink : theme.rule}`, letterSpacing: '0.04em' }}>
                {c === 'all' ? 'All' : c} <span style={{ opacity: 0.6 }}>· {count}</span>
              </button>
            );
          })}
          <div className="flex-1" />
          <span className="text-xs" style={{ color: theme.inkMute }}>{filtered.length} of {REPORT_CATALOG.length}</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiTile label="Reports Available" value={REPORT_CATALOG.length} sublabel="across 6 categories" icon={FileText} tone={theme.gold} />
        <KpiTile label="Auto-emailed" value={REPORT_CATALOG.filter(r => r.autoEmail).length} sublabel="scheduled deliveries" icon={Mail} tone={theme.teal} />
        <KpiTile label="Run Today" value={5} sublabel="across the platform" icon={Activity} tone={theme.leaf} />
        <KpiTile label="Custom Reports" value={REPORT_CATALOG.filter(r => r.category === 'Custom').length} sublabel="user-built" icon={Star} tone={theme.dusk} />
      </div>

      {/* Grouped reports */}
      {Object.keys(grouped).length === 0 ? (
        <div className="p-12 text-center" style={{ background: theme.bgPanel, border: `1px dashed ${theme.rule}` }}>
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ background: theme.tealSoft, color: theme.teal }}><Search size={20} /></div>
          <p className="font-serif text-lg mb-2" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>No reports match those filters</p>
          <p className="text-sm" style={{ color: theme.inkSoft }}>Try clearing the search or selecting "All" categories.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([cat, reports]) => {
          const meta = REPORT_CATEGORY_META[cat];
          const accent = meta.tone === 'gold' ? theme.gold : meta.tone === 'teal' ? theme.teal : meta.tone === 'leaf' ? theme.leaf : meta.tone === 'clay' ? theme.clay : theme.dusk;
          return (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                <div className="w-1.5 h-6" style={{ background: accent }} />
                <h3 className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>{cat}</h3>
                <span className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>· {reports.length} report{reports.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {reports.map(r => (
                  <div key={r.id} className="p-4 transition-all"
                    style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${accent}` }}>
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-serif" style={{ fontSize: '17px', color: theme.ink, letterSpacing: '-0.01em', fontWeight: 600 }}>{r.name}</h4>
                          {r.popular && <Pill tone="gold" size="sm">Popular</Pill>}
                        </div>
                        <p className="text-xs mb-3" style={{ color: theme.inkSoft, lineHeight: 1.5 }}>{r.description}</p>
                        <div className="flex items-center gap-3 flex-wrap text-[10px]" style={{ color: theme.inkMute }}>
                          <span className="flex items-center gap-1"><Clock size={10} /> {r.frequency}</span>
                          <span className="flex items-center gap-1"><Calendar size={10} /> Last: {r.lastRun}</span>
                          {r.autoEmail && <span className="flex items-center gap-1"><Mail size={10} /> {r.subscribers} subscribers</span>}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 flex items-center gap-2 flex-wrap" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
                      <Btn variant="primary" size="sm" icon={ArrowRight} onClick={() => runReport({ id: r.id, name: r.name, kind: 'flash' })}>Run Now</Btn>
                      <Btn variant="ghost" size="sm" icon={Calendar}>Schedule</Btn>
                      {r.autoEmail && <Btn variant="ghost" size="sm" icon={Mail}>Subscribers</Btn>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

const GMReportsModule = () => {
  const [tab, setTab] = useState('library');
  const [builderSelected, setBuilderSelected] = useState(['Date range', 'Total revenue', 'Occupancy %', 'ADR']);
  const [runningReport, setRunningReport] = useState(null); // { id, name, stage: 'generating' | 'ready' }

  const runReport = (report) => {
    setRunningReport({ ...report, stage: 'generating' });
    // simulate 2.5s generation
    setTimeout(() => {
      setRunningReport(prev => prev ? { ...prev, stage: 'ready' } : null);
    }, 2500);
  };

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Reporting · Operational</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Reports</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Run, schedule, and build the reports you need to run the property</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Mail}>Email Settings</Btn>
            <Btn variant="primary" icon={Plus}>Custom Report</Btn>
          </div>
        </div>
        <div className="px-8 flex gap-1" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
          {[
            { id: 'library', label: 'Reports Library', icon: BookOpen },
            { id: 'quick', label: 'Quick Run', icon: ArrowRight },
            { id: 'scheduled', label: 'Scheduled', icon: Calendar },
            { id: 'history', label: 'Recent Runs', icon: Clock },
            { id: 'builder', label: 'Custom Builder', icon: LayoutGrid },
          ].map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className="flex items-center gap-2 px-4 py-3 text-sm transition-all"
                style={{ color: active ? theme.ink : theme.inkSoft, fontWeight: active ? 600 : 400, borderBottom: active ? `2px solid ${theme.gold}` : '2px solid transparent', marginBottom: '-1px' }}>
                <Icon size={14} />{t.label}
              </button>
            );
          })}
        </div>
      </div>

      {tab === 'library' && <ReportsLibraryView runReport={runReport} />}
      {tab === 'quick' && (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiTile label="Reports Run · Today" value={5} sublabel="across the platform" icon={FileText} tone={theme.teal} />
            <KpiTile label="Auto-Sent · Today" value={4} sublabel="scheduled deliveries" icon={Mail} tone={theme.leaf} />
            <KpiTile label="Manual Runs · Today" value={1} sublabel="on-demand" icon={ArrowRight} tone={theme.gold} />
            <KpiTile label="Active Subscriptions" value={SCHEDULED_REPORTS.filter(s => s.active).length} sublabel={`of ${SCHEDULED_REPORTS.length} schedules`} icon={Calendar} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>Most-used reports</h2>
              <div className="flex-1 h-px" style={{ background: theme.rule }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {GM_QUICK_REPORTS.map(r => {
                const Icon = r.icon;
                return (
                  <div key={r.id} className="p-5 transition-all hover:translate-y-[-1px]"
                    style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderTop: `3px solid ${r.color}` }}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: r.color + '20', color: r.color }}>
                        <Icon size={18} />
                      </div>
                      {r.autopilot
                        ? <Pill tone="leaf" size="sm"><Mail size={9} /> On autopilot</Pill>
                        : <Pill tone="neutral" size="sm">Manual</Pill>}
                    </div>
                    <div className="font-serif text-lg mb-1" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>{r.name}</div>
                    <p className="text-xs leading-relaxed" style={{ color: theme.inkSoft }}>{r.description}</p>
                    <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
                      <div>
                        <div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Last Run</div>
                        <div className="text-xs" style={{ color: theme.ink }}>{r.lastRun}</div>
                      </div>
                      <div className="flex gap-1">
                        <Btn variant="ghost" size="sm" icon={Eye} onClick={() => runReport(r)}>Preview</Btn>
                        <Btn variant="primary" size="sm" icon={Download} onClick={() => runReport(r)}>Run</Btn>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-5 flex items-start gap-3" style={{ background: theme.goldSoft + '40', border: `1px solid ${theme.gold}30`, borderLeft: `3px solid ${theme.gold}` }}>
            <Mail size={16} style={{ color: theme.gold, marginTop: 2 }} />
            <div className="text-sm" style={{ color: theme.inkSoft }}>
              <span className="font-serif" style={{ color: theme.ink }}>Reports on autopilot: </span>
              4 reports are scheduled to deliver to your inbox each morning. View or change schedule in the <button onClick={() => setTab('scheduled')} className="underline" style={{ color: theme.gold, fontWeight: 600 }}>Scheduled</button> tab.
            </div>
          </div>
        </div>
      )}

      {tab === 'scheduled' && (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <KpiTile label="Active Schedules" value={SCHEDULED_REPORTS.filter(s => s.active).length} sublabel="auto-delivering" icon={Mail} tone={theme.leaf} />
            <KpiTile label="Paused" value={SCHEDULED_REPORTS.filter(s => !s.active).length} sublabel="not currently sent" icon={Ban} tone={theme.inkMute} />
            <KpiTile label="Distribution List" value={9} sublabel="unique recipients" icon={Users} tone={theme.teal} />
          </div>
          <Card title="Scheduled Reports" accent={theme.teal} padded={false}
            action={<Btn variant="primary" size="sm" icon={Plus}>New Schedule</Btn>}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Report</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Recipients</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Schedule</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Next Run</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Format</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
                  <th className="text-right py-3 px-5"></th>
                </tr>
              </thead>
              <tbody>
                {SCHEDULED_REPORTS.map((s, i) => {
                  const recipientList = s.recipient.split(', ');
                  return (
                    <tr key={s.id} style={{ borderBottom: i < SCHEDULED_REPORTS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none', opacity: s.active ? 1 : 0.55 }}>
                      <td className="py-3 px-5" style={{ color: theme.ink, fontWeight: 500 }}>{s.name}</td>
                      <td className="py-3 px-3">
                        <div className="text-xs" style={{ color: theme.inkSoft }}>{recipientList[0]}</div>
                        {recipientList.length > 1 && <div className="text-[10px]" style={{ color: theme.inkMute }}>+ {recipientList.length - 1} more</div>}
                      </td>
                      <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{s.schedule}</td>
                      <td className="py-3 px-3 text-xs" style={{ color: theme.ink }}>{s.nextRun}</td>
                      <td className="py-3 px-3 text-xs font-mono" style={{ color: theme.inkSoft }}>{s.format}</td>
                      <td className="py-3 px-3">
                        {s.active
                          ? <Pill tone="leaf" size="sm"><Check size={9} /> Active</Pill>
                          : <Pill tone="neutral" size="sm"><Ban size={9} /> Paused</Pill>}
                      </td>
                      <td className="py-3 px-5 text-right">
                        <div className="flex justify-end gap-1">
                          <Btn variant="ghost" size="sm" icon={PenLine}>Edit</Btn>
                          {s.active
                            ? <Btn variant="ghost" size="sm">Pause</Btn>
                            : <Btn variant="primary" size="sm">Resume</Btn>}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === 'history' && (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiTile label="Runs · Last 7 Days" value={48} sublabel="all reports" icon={FileText} />
            <KpiTile label="Successful" value={47} sublabel="98% success rate" icon={CircleCheck} tone={theme.leaf} />
            <KpiTile label="Warnings" value={1} sublabel="data sync issues" icon={AlertTriangle} tone={theme.gold} />
            <KpiTile label="Average Runtime" value="14 sec" sublabel="per report" icon={Clock} tone={theme.teal} />
          </div>
          <Card title="Recent Runs" accent={theme.dusk} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Report</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Run Time</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Trigger</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Recipients</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Format · Size</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
                  <th className="text-right py-3 px-5"></th>
                </tr>
              </thead>
              <tbody>
                {RECENT_RUNS.map((r, i) => (
                  <tr key={i} style={{ borderBottom: i < RECENT_RUNS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5" style={{ color: theme.ink, fontWeight: 500 }}>{r.name}</td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{r.time}</td>
                    <td className="py-3 px-3">
                      {r.manual
                        ? <Pill tone="gold" size="sm"><UserCircle size={9} /> Manual</Pill>
                        : <Pill tone="teal" size="sm"><Calendar size={9} /> Scheduled</Pill>}
                    </td>
                    <td className="py-3 px-3 text-right text-xs" style={{ color: theme.ink }}>{r.recipients}</td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkMute }}>{r.format} · {r.size}</td>
                    <td className="py-3 px-3">
                      {r.status === 'success'
                        ? <Pill tone="leaf" size="sm"><Check size={9} /> Success</Pill>
                        : <Pill tone="gold" size="sm"><AlertTriangle size={9} /> Warning</Pill>}
                      {r.note && <div className="text-[11px] mt-1 italic" style={{ color: theme.inkSoft }}>{r.note}</div>}
                    </td>
                    <td className="py-3 px-5 text-right">
                      <Btn variant="ghost" size="sm" icon={Download}
                        onClick={() => {
                          const matchingQuick = GM_QUICK_REPORTS.find(q => q.name === r.name);
                          if (matchingQuick) runReport(matchingQuick);
                          else runReport({ id: 'generic', name: r.name, icon: FileText, color: theme.dusk });
                        }}>
                        Re-download
                      </Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === 'builder' && (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="p-5 flex items-start gap-3" style={{ background: theme.bgPanelAlt, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.gold}` }}>
            <LayoutGrid size={16} style={{ color: theme.gold, marginTop: 2 }} />
            <div className="text-sm" style={{ color: theme.inkSoft }}>
              <span className="font-serif" style={{ color: theme.ink }}>Build a custom report. </span>
              Pick the fields you want, configure delivery, save it as a template or schedule it like any other report.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
              <Card title="1. Choose Fields" accent={theme.teal}>
                <div className="space-y-4">
                  {REPORT_BUILDER_FIELDS.map(group => (
                    <div key={group.category}>
                      <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.16em', fontWeight: 700 }}>{group.category}</div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map(item => {
                          const selected = builderSelected.includes(item);
                          return (
                            <button key={item}
                              onClick={() => setBuilderSelected(prev => selected ? prev.filter(x => x !== item) : [...prev, item])}
                              className="text-xs px-3 py-1.5 transition-all"
                              style={{
                                background: selected ? theme.gold : theme.bg,
                                color: selected ? '#FBF7EE' : theme.inkSoft,
                                border: `1px solid ${selected ? theme.gold : theme.rule}`,
                                fontWeight: selected ? 600 : 400,
                                letterSpacing: '0.02em',
                              }}>
                              {selected && <Check size={11} className="inline mr-1" />}
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="2. Visualization Style" accent={theme.dusk}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { id: 'table', label: 'Data Table', icon: LayoutGrid, def: true },
                    { id: 'line', label: 'Trend Lines', icon: Activity },
                    { id: 'bars', label: 'Bar Chart', icon: BarChart3 },
                    { id: 'mixed', label: 'Mixed', icon: TrendingUp },
                  ].map(v => {
                    const Icon = v.icon;
                    return (
                      <button key={v.id}
                        className="p-4 flex flex-col items-center gap-2 transition-all"
                        style={{ background: v.def ? theme.goldSoft + '50' : theme.bg, border: `1px solid ${v.def ? theme.gold : theme.rule}`, borderRadius: '2px' }}>
                        <Icon size={20} style={{ color: v.def ? theme.gold : theme.inkSoft }} />
                        <span className="text-xs" style={{ color: theme.ink, fontWeight: v.def ? 600 : 400 }}>{v.label}</span>
                      </button>
                    );
                  })}
                </div>
              </Card>

              <Card title="3. Delivery" accent={theme.leaf}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <div>
                        <div className="text-sm" style={{ color: theme.ink, fontWeight: 500 }}>Email when run</div>
                        <div className="text-xs" style={{ color: theme.inkMute }}>jana.kruger@thefloat.com</div>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input type="checkbox" className="w-4 h-4" />
                      <div>
                        <div className="text-sm" style={{ color: theme.ink, fontWeight: 500 }}>Schedule recurring</div>
                        <div className="text-xs" style={{ color: theme.inkMute }}>Daily, weekly, or monthly delivery</div>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input type="checkbox" className="w-4 h-4" />
                      <div>
                        <div className="text-sm" style={{ color: theme.ink, fontWeight: 500 }}>Save as template</div>
                        <div className="text-xs" style={{ color: theme.inkMute }}>Reuse with different filters next time</div>
                      </div>
                    </label>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderTop: `3px solid ${theme.gold}` }}>
                <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>Preview</div>
                <div className="font-serif mb-3" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>Your custom report</div>
                <div className="text-xs mb-4" style={{ color: theme.inkSoft }}>{builderSelected.length} field{builderSelected.length !== 1 ? 's' : ''} selected</div>
                <div className="space-y-1.5 mb-4">
                  {builderSelected.length === 0 && (
                    <div className="text-xs italic p-3 text-center" style={{ background: theme.bg, color: theme.inkMute, border: `1px dashed ${theme.rule}` }}>
                      Pick fields on the left to see preview
                    </div>
                  )}
                  {builderSelected.map(f => (
                    <div key={f} className="flex items-center gap-2 px-2 py-1.5 text-xs"
                      style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}`, borderLeft: `2px solid ${theme.teal}` }}>
                      <Check size={11} style={{ color: theme.teal }} />
                      <span style={{ color: theme.ink }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Btn variant="primary" size="md" icon={ArrowRight}
                    onClick={() => runReport({ id: 'custom', name: 'Custom Report', icon: LayoutGrid, color: theme.gold, customFields: builderSelected })}>
                    Run Report
                  </Btn>
                  <Btn variant="secondary" size="md" icon={Download}>Save as Template</Btn>
                </div>
              </div>

              <div className="p-4" style={{ background: theme.bgPanelAlt, border: `1px solid ${theme.rule}` }}>
                <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Saved Templates</div>
                <div className="space-y-1.5">
                  {['Weekend trade pulse', 'Wholesaler performance', 'Repeat guest report'].map(name => (
                    <button key={name} className="w-full text-left text-xs px-2 py-1.5 transition-all"
                      style={{ background: 'transparent', color: theme.inkSoft }}
                      onMouseOver={(e) => { e.currentTarget.style.background = theme.bg; e.currentTarget.style.color = theme.ink; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = theme.inkSoft; }}>
                      <FileText size={10} className="inline mr-1.5" />{name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {runningReport && <ReportRunModal report={runningReport} onClose={() => setRunningReport(null)} />}
    </div>
  );
};

// ============================================================================
// REPORT RUN MODAL — animated generation + content preview
// ============================================================================
const ReportRunModal = ({ report, onClose }) => {
  const isGenerating = report.stage === 'generating';
  const Icon = report.icon || FileText;
  const accentColor = report.color || theme.gold;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8" style={{ background: 'rgba(21,32,31,0.5)' }} onClick={onClose}>
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="px-7 py-5 flex items-start justify-between" style={{ background: accentColor + '15', borderBottom: `1px solid ${theme.rule}` }}>
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: accentColor + '25', color: accentColor }}>
              <Icon size={20} />
            </div>
            <div>
              <div className="text-[10px] uppercase" style={{ color: accentColor, letterSpacing: '0.18em', fontWeight: 700 }}>{isGenerating ? 'Running report' : 'Report ready'}</div>
              <div className="font-serif mt-1" style={{ fontSize: '24px', color: theme.ink, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{report.name}</div>
              <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>The Float · 25 April 2026 · Generated by Jana Kruger</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5"><X size={20} style={{ color: theme.inkSoft }} /></button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-7" style={{ background: theme.bg }}>
          {isGenerating ? <ReportGeneratingView accentColor={accentColor} /> : <ReportContent report={report} />}
        </div>

        {/* Footer */}
        <div className="px-7 py-4 flex items-center justify-between" style={{ background: theme.bgPanel, borderTop: `1px solid ${theme.rule}` }}>
          <div className="text-xs" style={{ color: theme.inkMute }}>
            {isGenerating ? 'Compiling data from PMS, POS, and HK systems…' : 'Report generated in 2.4 seconds · 184 KB'}
          </div>
          <div className="flex gap-2">
            {!isGenerating && (
              <>
                <Btn variant="ghost" icon={Mail}>Email</Btn>
                <Btn variant="secondary" icon={Printer}>Print A4</Btn>
                <Btn variant="primary" icon={Download}>Download PDF</Btn>
              </>
            )}
            {isGenerating && <Btn variant="ghost" onClick={onClose}>Cancel</Btn>}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportGeneratingView = ({ accentColor }) => {
  const [step, setStep] = useState(0);
  const stages = [
    { label: 'Connecting to PMS', icon: RefreshCw },
    { label: 'Querying revenue & occupancy data', icon: BarChart3 },
    { label: 'Aggregating department-level metrics', icon: Activity },
    { label: 'Generating PDF with The Float branding', icon: FileText },
  ];

  React.useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1100);
    const t3 = setTimeout(() => setStep(3), 1700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="py-12 max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ background: accentColor + '15', border: `2px dashed ${accentColor}60` }}>
          <RefreshCw size={32} style={{ color: accentColor, animation: 'spin 1.5s linear infinite' }} />
        </div>
        <div className="font-serif" style={{ fontSize: '22px', color: theme.ink, letterSpacing: '-0.01em' }}>Generating your report</div>
        <p className="text-sm mt-2" style={{ color: theme.inkSoft }}>This usually takes a few seconds…</p>
      </div>
      <div className="space-y-2">
        {stages.map((s, i) => {
          const Icon = s.icon;
          const isDone = step > i;
          const isCurrent = step === i;
          const isPending = step < i;
          return (
            <div key={s.label} className="flex items-center gap-3 p-3 transition-all"
              style={{
                background: isDone ? theme.leafSoft + '40' : isCurrent ? accentColor + '15' : theme.bgPanel,
                border: `1px solid ${isDone ? theme.leaf + '30' : isCurrent ? accentColor + '30' : theme.ruleSoft}`,
                borderLeft: `3px solid ${isDone ? theme.leaf : isCurrent ? accentColor : theme.rule}`,
                opacity: isPending ? 0.5 : 1,
              }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: isDone ? theme.leaf : isCurrent ? accentColor : theme.ruleSoft, color: isDone || isCurrent ? '#FBF7EE' : theme.inkMute }}>
                {isDone ? <Check size={13} /> : <Icon size={13} style={{ animation: isCurrent ? 'spin 1.5s linear infinite' : 'none' }} />}
              </div>
              <span className="text-sm" style={{ color: isPending ? theme.inkMute : theme.ink, fontWeight: isCurrent ? 600 : 400 }}>{s.label}</span>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

const ReportContent = ({ report }) => {
  // Render different content based on report id
  if (report.id === 'qr-1') return <ReportFlash />;
  if (report.id === 'qr-2') return <ReportArrivalsDepartures />;
  if (report.id === 'qr-3') return <ReportRoomStatus />;
  if (report.id === 'qr-4') return <ReportFBSummary />;
  if (report.id === 'qr-5') return <ReportNightAudit />;
  if (report.id === 'qr-6') return <ReportHKProductivity />;
  if (report.id === 'custom') return <ReportCustom fields={report.customFields || []} />;
  return <ReportGeneric name={report.name} />;
};

// PDF-style header used for every rendered report
const ReportLetterhead = ({ title, subtitle }) => (
  <div className="pb-5 mb-6" style={{ borderBottom: `2px solid ${theme.gold}` }}>
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center" style={{ background: theme.navBg, padding: '8px 12px' }}>
          <FloatLogo size="md" />
        </div>
        <div>
          <div className="font-serif" style={{ fontSize: '22px', color: theme.ink, letterSpacing: '-0.01em' }}>The Float</div>
          <div className="text-[10px]" style={{ color: theme.inkMute, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Lake Volta · Ghana</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[10px]" style={{ color: theme.inkMute, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>{subtitle}</div>
        <div className="font-serif mt-1" style={{ fontSize: '22px', color: theme.ink, letterSpacing: '-0.01em' }}>{title}</div>
        <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>Saturday, 25 April 2026</div>
      </div>
    </div>
  </div>
);

// === Daily Manager's Flash report ===
const ReportFlash = () => (
  <div style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, padding: 32 }}>
    <ReportLetterhead title="Daily Manager's Flash" subtitle="Operational Report" />
    <div className="grid grid-cols-4 gap-4 mb-6">
      {[
        { label: 'Occupancy', value: '87.5%', sub: '+4.2pp vs yesterday' },
        { label: 'ADR', value: cedi(1840), sub: '+6.1% vs yesterday' },
        { label: 'RevPAR', value: cedi(1610), sub: '+10.6% vs yesterday' },
        { label: 'Total Revenue', value: cedi(187500), sub: '+12.3% vs budget' },
      ].map(k => (
        <div key={k.label} className="p-4" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
          <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>{k.label}</div>
          <div className="font-serif" style={{ fontSize: '24px', color: theme.ink, letterSpacing: '-0.02em' }}>{k.value}</div>
          <div className="text-xs mt-1" style={{ color: theme.leaf }}>{k.sub}</div>
        </div>
      ))}
    </div>
    <h3 className="font-serif mb-3" style={{ fontSize: '15px', color: theme.ink, letterSpacing: '0.01em' }}>Revenue by Department</h3>
    <table className="w-full text-sm mb-6">
      <thead>
        <tr style={{ borderBottom: `1px solid ${theme.rule}` }}>
          <th className="text-left py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Department</th>
          <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Revenue</th>
          <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>% of Total</th>
          <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>vs Budget</th>
        </tr>
      </thead>
      <tbody>
        {[
          { dept: 'Rooms', rev: 124000, pct: 66.1, vs: 8.4 },
          { dept: 'Restaurant', rev: 38000, pct: 20.3, vs: 12.1 },
          { dept: 'Bar', rev: 18500, pct: 9.9, vs: 28.6 },
          { dept: 'Spa & Other', rev: 7000, pct: 3.7, vs: -8.2 },
        ].map(r => (
          <tr key={r.dept} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
            <td className="py-2" style={{ color: theme.ink, fontWeight: 500 }}>{r.dept}</td>
            <td className="py-2 text-right font-mono" style={{ color: theme.ink }}>{cedi(r.rev)}</td>
            <td className="py-2 text-right text-xs" style={{ color: theme.inkSoft }}>{r.pct.toFixed(1)}%</td>
            <td className="py-2 text-right" style={{ color: r.vs >= 0 ? theme.leaf : theme.clay, fontWeight: 600 }}>{r.vs >= 0 ? '+' : ''}{r.vs.toFixed(1)}%</td>
          </tr>
        ))}
        <tr style={{ borderTop: `2px solid ${theme.ink}` }}>
          <td className="py-2 font-serif" style={{ color: theme.ink, fontWeight: 700 }}>Total</td>
          <td className="py-2 text-right font-mono" style={{ color: theme.gold, fontWeight: 700 }}>{cedi(187500)}</td>
          <td className="py-2 text-right text-xs" style={{ color: theme.inkSoft }}>100.0%</td>
          <td className="py-2 text-right" style={{ color: theme.leaf, fontWeight: 700 }}>+12.3%</td>
        </tr>
      </tbody>
    </table>
    <div className="grid grid-cols-2 gap-4 text-xs mb-6">
      <div className="p-3" style={{ background: theme.leafSoft + '40', border: `1px solid ${theme.leaf}30`, borderLeft: `3px solid ${theme.leaf}` }}>
        <div className="text-[10px] uppercase mb-1" style={{ color: theme.leaf, letterSpacing: '0.14em', fontWeight: 700 }}>Highlights</div>
        <p style={{ color: theme.ink }}>Sunset Bar +28.6% vs budget driven by weekend trade. 14 arrivals expected today, 4 VIPs.</p>
      </div>
      <div className="p-3" style={{ background: theme.claySoft + '40', border: `1px solid ${theme.clay}30`, borderLeft: `3px solid ${theme.clay}` }}>
        <div className="text-[10px] uppercase mb-1" style={{ color: theme.clay, letterSpacing: '0.14em', fontWeight: 700 }}>Watch list</div>
        <p style={{ color: theme.ink }}>F&B cost of sales 12% over budget MTD. Spa revenue tracking 8% under. WO-340 (Room 207) still OOO.</p>
      </div>
    </div>
    <div className="text-[10px] pt-3 text-center" style={{ borderTop: `1px solid ${theme.ruleSoft}`, color: theme.inkMute, letterSpacing: '0.1em' }}>
      Generated by The Float Hospitality Platform · Confidential · Page 1 of 1
    </div>
  </div>
);

// === Arrivals & Departures report ===
const ReportArrivalsDepartures = () => (
  <div style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, padding: 32 }}>
    <ReportLetterhead title="Arrivals & Departures" subtitle="Daily Front Desk Report" />
    <div className="grid grid-cols-4 gap-3 mb-6">
      <div className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
        <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Expected Arrivals</div>
        <div className="font-serif text-2xl" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>{ARRIVALS.length}</div>
      </div>
      <div className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
        <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Departures</div>
        <div className="font-serif text-2xl" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>{DEPARTURES.length}</div>
      </div>
      <div className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
        <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>VIPs</div>
        <div className="font-serif text-2xl" style={{ color: theme.gold, letterSpacing: '-0.02em' }}>{ARRIVALS.filter(a => a.vip).length}</div>
      </div>
      <div className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
        <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Outstanding</div>
        <div className="font-serif text-2xl" style={{ color: theme.clay, letterSpacing: '-0.02em' }}>{cedi(DEPARTURES.reduce((s, d) => s + d.folioBalance, 0))}</div>
      </div>
    </div>
    <h3 className="font-serif mb-3" style={{ fontSize: '15px', color: theme.ink }}>Arrivals · By ETA</h3>
    <table className="w-full text-sm mb-6">
      <thead>
        <tr style={{ borderBottom: `1px solid ${theme.rule}` }}>
          <th className="text-left py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>ETA</th>
          <th className="text-left py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Guest</th>
          <th className="text-left py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Room</th>
          <th className="text-left py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Source</th>
          <th className="text-left py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Notes</th>
        </tr>
      </thead>
      <tbody>
        {ARRIVALS.slice(0, 6).map(a => (
          <tr key={a.id} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
            <td className="py-2 font-mono text-xs" style={{ color: theme.ink }}>{a.eta}</td>
            <td className="py-2" style={{ color: theme.ink, fontWeight: 500 }}>
              {a.guest}{a.vip && <span className="ml-2 text-[10px]" style={{ color: theme.gold, fontWeight: 700 }}>VIP</span>}
            </td>
            <td className="py-2 font-mono text-xs" style={{ color: theme.inkSoft }}>{a.room || 'TBD'}</td>
            <td className="py-2 text-xs" style={{ color: theme.inkSoft }}>{a.source}</td>
            <td className="py-2 text-xs italic" style={{ color: theme.inkSoft }}>{a.special || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="text-[10px] pt-3 text-center" style={{ borderTop: `1px solid ${theme.ruleSoft}`, color: theme.inkMute, letterSpacing: '0.1em' }}>
      Generated by The Float Hospitality Platform · Confidential
    </div>
  </div>
);

// === Room Status report ===
const ReportRoomStatus = () => {
  const counts = { VC: 0, VD: 0, OC: 0, OD: 0, OOO: 0, OOS: 0, IN: 0 };
  ROOMS.forEach(r => counts[r.status]++);
  return (
    <div style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, padding: 32 }}>
      <ReportLetterhead title="Room Status Snapshot" subtitle="Live Inventory Report" />
      <div className="grid grid-cols-7 gap-2 mb-6">
        {Object.entries(counts).map(([code, n]) => {
          const s = STATUSES[code];
          return (
            <div key={code} className="p-3 text-center" style={{ background: s.soft, border: `1px solid ${s.color}30` }}>
              <div className="font-mono text-[10px] mb-1" style={{ color: s.ink, fontWeight: 700 }}>{code}</div>
              <div className="font-serif text-2xl" style={{ color: s.ink, letterSpacing: '-0.02em' }}>{n}</div>
              <div className="text-[10px]" style={{ color: s.ink }}>{s.label}</div>
            </div>
          );
        })}
      </div>
      <h3 className="font-serif mb-3" style={{ fontSize: '15px', color: theme.ink }}>By Floor</h3>
      <table className="w-full text-sm mb-6">
        <thead>
          <tr style={{ borderBottom: `1px solid ${theme.rule}` }}>
            <th className="text-left py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Floor</th>
            <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Total Rooms</th>
            <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Occupied</th>
            <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Clean</th>
            <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Issues</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map(f => {
            const rooms = ROOMS.filter(r => r.floor === f);
            const occ = rooms.filter(r => ['OC', 'OD'].includes(r.status)).length;
            const clean = rooms.filter(r => ['VC', 'OC', 'IN'].includes(r.status)).length;
            const issues = rooms.filter(r => ['OOO', 'OOS'].includes(r.status)).length;
            return (
              <tr key={f} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                <td className="py-2" style={{ color: theme.ink, fontWeight: 500 }}>Floor {f}</td>
                <td className="py-2 text-right font-mono" style={{ color: theme.ink }}>{rooms.length}</td>
                <td className="py-2 text-right font-mono" style={{ color: theme.ink }}>{occ}</td>
                <td className="py-2 text-right font-mono" style={{ color: theme.ink }}>{clean}</td>
                <td className="py-2 text-right font-mono" style={{ color: issues > 0 ? theme.clay : theme.inkMute, fontWeight: issues > 0 ? 600 : 400 }}>{issues}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="p-3 text-xs" style={{ background: theme.claySoft + '40', border: `1px solid ${theme.clay}30`, borderLeft: `3px solid ${theme.clay}` }}>
        <span className="font-serif" style={{ color: theme.ink, fontWeight: 600 }}>Out of order: </span>
        <span style={{ color: theme.ink }}>Room 207 (AC unit not cooling, WO-340) · Room 111 (carpet replacement, OOS)</span>
      </div>
      <div className="text-[10px] pt-3 mt-6 text-center" style={{ borderTop: `1px solid ${theme.ruleSoft}`, color: theme.inkMute, letterSpacing: '0.1em' }}>
        Generated by The Float Hospitality Platform · Confidential
      </div>
    </div>
  );
};

// === F&B Daily Summary report ===
const ReportFBSummary = () => (
  <div style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, padding: 32 }}>
    <ReportLetterhead title="F&B Daily Summary" subtitle="Food & Beverage Report" />
    <div className="grid grid-cols-4 gap-3 mb-6">
      <div className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
        <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>F&B Revenue</div>
        <div className="font-serif text-2xl" style={{ color: theme.ink }}>{cedi(28450)}</div>
      </div>
      <div className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
        <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Cost %</div>
        <div className="font-serif text-2xl" style={{ color: theme.clay }}>31.4%</div>
      </div>
      <div className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
        <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Covers</div>
        <div className="font-serif text-2xl" style={{ color: theme.ink }}>184</div>
      </div>
      <div className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
        <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Avg Spend</div>
        <div className="font-serif text-2xl" style={{ color: theme.ink }}>{cedi(154.6)}</div>
      </div>
    </div>
    <h3 className="font-serif mb-3" style={{ fontSize: '15px', color: theme.ink }}>By Outlet</h3>
    <table className="w-full text-sm mb-6">
      <thead>
        <tr style={{ borderBottom: `1px solid ${theme.rule}` }}>
          <th className="text-left py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Outlet</th>
          <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Revenue</th>
          <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Covers</th>
          <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Cost %</th>
          <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>vs Budget</th>
        </tr>
      </thead>
      <tbody>
        {OUTLETS.map(o => (
          <tr key={o.id} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
            <td className="py-2" style={{ color: theme.ink, fontWeight: 500 }}>{o.name}</td>
            <td className="py-2 text-right font-mono" style={{ color: theme.ink }}>{cedi(o.revenue)}</td>
            <td className="py-2 text-right font-mono" style={{ color: theme.ink }}>{o.covers}</td>
            <td className="py-2 text-right font-mono" style={{ color: o.costPct > 32 ? theme.clay : theme.ink }}>{pct(o.costPct)}</td>
            <td className="py-2 text-right" style={{ color: o.vsBudget >= 0 ? theme.leaf : theme.clay, fontWeight: 600 }}>{o.vsBudget >= 0 ? '+' : ''}{o.vsBudget}%</td>
          </tr>
        ))}
      </tbody>
    </table>
    <h3 className="font-serif mb-3" style={{ fontSize: '15px', color: theme.ink }}>Top 5 Sellers</h3>
    <table className="w-full text-sm mb-6">
      <tbody>
        {TOP_ITEMS.map((item, i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
            <td className="py-2 font-serif" style={{ color: theme.gold, width: 30, fontWeight: 500 }}>{String(i + 1).padStart(2, '0')}</td>
            <td className="py-2" style={{ color: theme.ink, fontWeight: 500 }}>{item.name}</td>
            <td className="py-2 text-right text-xs" style={{ color: theme.inkMute }}>{item.sold} sold</td>
            <td className="py-2 text-right font-mono" style={{ color: theme.ink }}>{cedi(item.revenue)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="text-[10px] pt-3 text-center" style={{ borderTop: `1px solid ${theme.ruleSoft}`, color: theme.inkMute, letterSpacing: '0.1em' }}>
      Generated by The Float Hospitality Platform · Confidential
    </div>
  </div>
);

// === Night Audit Pack ===
const ReportNightAudit = () => (
  <div style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, padding: 32 }}>
    <ReportLetterhead title="Night Audit Pack" subtitle="End-of-Day Reconciliation" />
    <div className="p-4 mb-6" style={{ background: theme.leafSoft + '40', border: `1px solid ${theme.leaf}30`, borderLeft: `3px solid ${theme.leaf}` }}>
      <div className="flex items-center gap-2">
        <CircleCheck size={16} style={{ color: theme.leaf }} />
        <span className="font-serif" style={{ color: theme.ink, fontWeight: 600 }}>Audit completed successfully</span>
        <span className="text-xs" style={{ color: theme.inkSoft }}>· 02:42 → 03:02 · 20 min runtime</span>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div>
        <h3 className="font-serif mb-3" style={{ fontSize: '15px', color: theme.ink }}>Cashier Reconciliation</h3>
        <table className="w-full text-sm">
          <tbody>
            {[
              { shift: 'Morning · Amani M.', total: 48200, variance: 0 },
              { shift: 'Afternoon · Kwame A.', total: 92400, variance: 24 },
              { shift: 'Night · Esi O.', total: 64200, variance: 0 },
            ].map(s => (
              <tr key={s.shift} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                <td className="py-2 text-xs" style={{ color: theme.inkSoft }}>{s.shift}</td>
                <td className="py-2 text-right font-mono" style={{ color: theme.ink }}>{cedi(s.total)}</td>
                <td className="py-2 text-right font-mono text-xs" style={{ color: s.variance === 0 ? theme.leaf : theme.gold, fontWeight: 600 }}>
                  {s.variance === 0 ? '₵0' : '+₵' + s.variance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="font-serif mb-3" style={{ fontSize: '15px', color: theme.ink }}>Bank Deposits</h3>
        <table className="w-full text-sm">
          <tbody>
            {[
              { method: 'Card settlements', amount: 184200 },
              { method: 'MTN MoMo', amount: 12400 },
              { method: 'Vodafone Cash', amount: 4800 },
              { method: 'Cash to safe', amount: 8420 },
              { method: 'City Ledger', amount: 9450 },
            ].map(r => (
              <tr key={r.method} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                <td className="py-2 text-xs" style={{ color: theme.inkSoft }}>{r.method}</td>
                <td className="py-2 text-right font-mono" style={{ color: theme.ink }}>{cedi(r.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="p-3 text-xs" style={{ background: theme.bgPanelAlt, border: `1px solid ${theme.rule}` }}>
      <div className="text-[10px] uppercase mb-1" style={{ color: theme.gold, letterSpacing: '0.14em', fontWeight: 700 }}>Notable Items</div>
      <p style={{ color: theme.ink }}>1 no-show charge applied (David Chen, R1049, ₵1,240). Cashier variance immaterial. No system errors.</p>
    </div>
    <div className="text-[10px] pt-3 mt-6 text-center" style={{ borderTop: `1px solid ${theme.ruleSoft}`, color: theme.inkMute, letterSpacing: '0.1em' }}>
      Generated by The Float Hospitality Platform · Confidential
    </div>
  </div>
);

// === Housekeeping Productivity ===
const ReportHKProductivity = () => (
  <div style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, padding: 32 }}>
    <ReportLetterhead title="Housekeeping Productivity" subtitle="Weekly Report" />
    <h3 className="font-serif mb-3" style={{ fontSize: '15px', color: theme.ink }}>Attendant Performance · Last 7 Days</h3>
    <table className="w-full text-sm mb-6">
      <thead>
        <tr style={{ borderBottom: `1px solid ${theme.rule}` }}>
          <th className="text-left py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Attendant</th>
          <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Rooms/Day</th>
          <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Min/Room</th>
          <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Quality Score</th>
          <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Trend</th>
        </tr>
      </thead>
      <tbody>
        {[
          { name: 'Akua Mensah', rpd: 14, mr: 24, q: 4.7, trend: 4 },
          { name: 'Adwoa Boateng', rpd: 12, mr: 26, q: 4.6, trend: 2 },
          { name: 'Joseph Tetteh', rpd: 13, mr: 28, q: 4.4, trend: -1 },
          { name: 'Esi Owusu', rpd: 11, mr: 25, q: 4.8, trend: 6 },
        ].map(a => (
          <tr key={a.name} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
            <td className="py-2" style={{ color: theme.ink, fontWeight: 500 }}>{a.name}</td>
            <td className="py-2 text-right font-mono" style={{ color: theme.ink }}>{a.rpd}</td>
            <td className="py-2 text-right font-mono" style={{ color: theme.ink }}>{a.mr}</td>
            <td className="py-2 text-right font-mono" style={{ color: theme.ink }}>{a.q.toFixed(1)} / 5</td>
            <td className="py-2 text-right" style={{ color: a.trend >= 0 ? theme.leaf : theme.clay, fontWeight: 600 }}>{a.trend >= 0 ? '+' : ''}{a.trend}%</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
        <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Avg Turnaround</div>
        <div className="font-serif text-xl" style={{ color: theme.ink }}>26 min</div>
      </div>
      <div className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
        <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Inspection Pass</div>
        <div className="font-serif text-xl" style={{ color: theme.leaf }}>96%</div>
      </div>
      <div className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
        <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>OOO Hours</div>
        <div className="font-serif text-xl" style={{ color: theme.gold }}>14h</div>
      </div>
    </div>
    <div className="text-[10px] pt-3 text-center" style={{ borderTop: `1px solid ${theme.ruleSoft}`, color: theme.inkMute, letterSpacing: '0.1em' }}>
      Generated by The Float Hospitality Platform · Confidential
    </div>
  </div>
);

// === Custom report builder output ===
const ReportCustom = ({ fields }) => (
  <div style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, padding: 32 }}>
    <ReportLetterhead title="Custom Report" subtitle="Ad-hoc Report" />
    <div className="mb-4 p-3" style={{ background: theme.bgPanelAlt, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.gold}` }}>
      <div className="text-[10px] uppercase mb-1" style={{ color: theme.gold, letterSpacing: '0.14em', fontWeight: 700 }}>Selected Fields</div>
      <div className="text-sm" style={{ color: theme.ink }}>{fields.join(' · ')}</div>
    </div>
    <table className="w-full text-sm mb-6">
      <thead>
        <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
          <th className="text-left py-2 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Date</th>
          {fields.filter(f => f !== 'Date range').map(f => (
            <th key={f} className="text-right py-2 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>{f}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[
          { date: '19 Apr', vals: [142400, 71.9, 1652] },
          { date: '20 Apr', vals: [148200, 74.2, 1681] },
          { date: '21 Apr', vals: [156800, 78.1, 1728] },
          { date: '22 Apr', vals: [162400, 80.6, 1748] },
          { date: '23 Apr', vals: [168200, 82.4, 1782] },
          { date: '24 Apr', vals: [178600, 85.1, 1812] },
          { date: '25 Apr', vals: [187500, 87.5, 1840] },
        ].map(row => (
          <tr key={row.date} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
            <td className="py-2 px-3" style={{ color: theme.ink, fontWeight: 500 }}>{row.date}</td>
            {fields.filter(f => f !== 'Date range').map((f, i) => (
              <td key={f} className="py-2 px-3 text-right font-mono" style={{ color: theme.ink }}>
                {f.includes('%') ? (row.vals[i % 3] || 0).toFixed(1) + '%' : cedi(row.vals[i % 3] || 0)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <div className="text-[10px] pt-3 text-center" style={{ borderTop: `1px solid ${theme.ruleSoft}`, color: theme.inkMute, letterSpacing: '0.1em' }}>
      Generated by The Float Hospitality Platform · Custom Report · Confidential
    </div>
  </div>
);

// === Generic fallback ===
const ReportGeneric = ({ name }) => (
  <div style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, padding: 32 }}>
    <ReportLetterhead title={name} subtitle="Report" />
    <div className="text-sm" style={{ color: theme.inkSoft }}>Report content rendered here.</div>
  </div>
);

// ============================================================================
// GM MORNING BRIEF — start-of-day situational awareness
// ============================================================================

const GmreportsComingSoon = ({ title }) => (
  <div className="p-4 md:p-6" style={{ background: theme.bg, minHeight: '100%' }}>
    <SectionHeader overline="Module" title={title} />
    <div className="p-12 text-center" style={{ background: theme.bgPanel, border: `1px dashed ${theme.rule}` }}>
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ background: theme.tealSoft, color: theme.teal }}><Sparkles size={20} /></div>
      <p className="font-serif text-lg mb-2" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Module defined in the BRD</p>
      <p className="text-sm" style={{ color: theme.inkSoft }}>To be built in the next sprint.</p>
    </div>
  </div>
);

// ============================================================================
// APP
// ============================================================================
const GmreportsApp = () => {
  const [activeNav, setActiveNav] = useState('reports');
  let content;
  content = <GMReportsModule />;
  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: theme.bg, fontFamily: '"Inter", system-ui, sans-serif', color: theme.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.rule}; }
      `}</style>
      <GmreportsSidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <GmreportsTopBar />
        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
};


// ============================================================================
// FRONT OFFICE MANAGER · Amani Mlangeni
// ============================================================================
const FOM_NAV = [
  { id: 'arrivals', label: 'Arrivals & Departures', icon: Bed },
  { id: 'tape-chart', label: 'Tape Chart', icon: LayoutGrid },
  { id: 'rooms', label: 'Room Status', icon: Hotel },
  { id: 'in-house', label: 'In-House Guests', icon: Users },
  { id: 'cashier', label: 'Cashier Shift', icon: Receipt },
];
// ============================================================================
// SIDEBAR — Front Office Manager
// ============================================================================
const FomSidebar = ({ activeNav, setActiveNav }) => (
  <aside className="hidden md:flex w-64 flex-shrink-0 flex-col" style={{ background: theme.navBg, color: '#FBF7EE' }}>
    <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <FloatLogo size="md" />
          <div className="text-[10px] mt-1" style={{ color: theme.gold, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Ghana</div>
        </div>
      </div>
    </div>
    <div className="px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium" style={{ background: theme.gold, color: theme.navBg, fontSize: '13px' }}>AM</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm" style={{ fontWeight: 500 }}>Amani Mlangeni</div>
          <div className="text-[10px]" style={{ color: theme.gold, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>Front Office Manager</div>
        </div>
      </div>
    </div>
    <nav className="flex-1 px-3 py-3 overflow-y-auto">
      {FOM_NAV.map(item => {
        const Icon = item.icon;
        const active = activeNav === item.id;
        return (
          <button key={item.id} onClick={() => setActiveNav(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all text-sm"
            style={{ background: active ? 'rgba(185,135,64,0.15)' : 'transparent', color: active ? theme.gold : 'rgba(255,255,255,0.75)', borderLeft: active ? `3px solid ${theme.gold}` : '3px solid transparent', fontWeight: active ? 600 : 400 }}>
            <Icon size={15} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: theme.gold, color: theme.navBg, fontWeight: 700 }}>{item.badge}</span>}
          </button>
        );
      })}
    </nav>
    <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span>v1.0</span>
        <button className="hover:text-white"><LogOut size={12} /></button>
      </div>
    </div>
  </aside>
);

const FomTopBar = () => (
  <div className="flex items-center justify-between pl-16 pr-4 md:px-8 py-3 md:py-4" style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
    <div className="flex items-center gap-3 text-sm" style={{ color: theme.inkSoft }}>
      <Calendar size={14} /><span className="hidden md:inline">Saturday, 25 April 2026
    </span><span className="md:hidden">Sat 25 Apr</span></div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
        <Search size={13} style={{ color: theme.inkMute }} />
        <input placeholder="Search…" className="bg-transparent outline-none text-sm w-48" style={{ color: theme.ink }} />
      </div>
      <button className="relative p-2"><Bell size={15} style={{ color: theme.inkSoft }} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: theme.gold }} /></button>
    </div>
  </div>
);

// MOCK DATA
const IN_HOUSE_GUESTS = [
  { id: 'IH-1041', name: 'Edward Coetzee', room: '105', type: 'Standard', arrived: '21 Apr', departing: '25 Apr', nights: 4, balance: 0, vip: false, source: 'Direct', nationality: 'South Africa', folio: 5680 },
  { id: 'IH-1042', name: 'Robert Mensah', room: '105', type: 'Standard', arrived: '23 Apr', departing: '26 Apr', nights: 3, balance: 1480, vip: false, source: 'Booking.com', nationality: 'Ghana', folio: 4240 },
  { id: 'IH-1043', name: 'Yuki Tanaka', room: '103', type: 'Standard', arrived: '24 Apr', departing: '26 Apr', nights: 2, balance: 240, vip: false, source: 'Direct', nationality: 'Japan', folio: 2080 },
  { id: 'IH-1044', name: 'Sarah Weisz', room: '107', type: 'Garden', arrived: '23 Apr', departing: '27 Apr', nights: 4, balance: 0, vip: false, source: 'Direct', nationality: 'Israel', folio: 5340 },
  { id: 'IH-1045', name: 'Ndidi Okafor', room: '109', type: 'Garden', arrived: '24 Apr', departing: '28 Apr', nights: 4, balance: 320, vip: false, source: 'Direct', nationality: 'Nigeria', folio: 5280 },
  { id: 'IH-1046', name: 'James Pretorius', room: '110', type: 'Garden', arrived: '23 Apr', departing: '26 Apr', nights: 3, balance: 0, vip: false, source: 'Booking.com', nationality: 'South Africa', folio: 3920 },
  { id: 'IH-1047', name: 'Hannah Müller', room: '112', type: 'Garden', arrived: '24 Apr', departing: '27 Apr', nights: 3, balance: 880, vip: false, source: 'Expedia', nationality: 'Germany', folio: 3920 },
  { id: 'IH-1048', name: 'Ahmed Khoury', room: '201', type: 'Deluxe', arrived: '22 Apr', departing: '26 Apr', nights: 4, balance: 0, vip: false, source: 'Travel Agent', nationality: 'Lebanon', folio: 7080 },
  { id: 'IH-1049', name: 'Lin Wei', room: '203', type: 'Deluxe', arrived: '23 Apr', departing: '27 Apr', nights: 4, balance: 480, vip: false, source: 'Direct', nationality: 'China', folio: 7080 },
  { id: 'IH-1050', name: 'Olivia Brown', room: '205', type: 'Deluxe', arrived: '24 Apr', departing: '26 Apr', nights: 2, balance: 1240, vip: false, source: 'Booking.com', nationality: 'UK', folio: 3540 },
  { id: 'IH-1051', name: 'Pavel Dimitrov', room: '206', type: 'Deluxe', arrived: '21 Apr', departing: '28 Apr', nights: 7, balance: 0, vip: true, source: 'Direct', nationality: 'Bulgaria', folio: 12380 },
  { id: 'IH-1052', name: 'Ezra Goldberg', room: '208', type: 'Deluxe', arrived: '23 Apr', departing: '26 Apr', nights: 3, balance: 240, vip: false, source: 'Direct', nationality: 'USA', folio: 5240 },
  { id: 'IH-1053', name: 'Beatrice Walsh', room: '211', type: 'Deluxe', arrived: '24 Apr', departing: '27 Apr', nights: 3, balance: 0, vip: false, source: 'Booking.com', nationality: 'Ireland', folio: 5240 },
  { id: 'IH-1054', name: 'Hiroshi Yamada', room: '212', type: 'Deluxe', arrived: '22 Apr', departing: '28 Apr', nights: 6, balance: 1620, vip: false, source: 'Direct', nationality: 'Japan', folio: 10380 },
  { id: 'IH-1055', name: 'Aisha Bello', room: '214', type: 'Deluxe', arrived: '24 Apr', departing: '27 Apr', nights: 3, balance: 0, vip: false, source: 'Direct', nationality: 'Nigeria', folio: 5240 },
  { id: 'IH-1056', name: 'Ines & Carlos Reyes', room: '301', type: 'Volta Suite', arrived: '25 Apr', departing: '29 Apr', nights: 4, balance: 0, vip: true, source: 'Direct', nationality: 'Spain', folio: 14920 },
  { id: 'IH-1057', name: 'Charlotte Devereux', room: '302', type: 'Suite', arrived: '23 Apr', departing: '25 Apr', nights: 2, balance: 0, vip: true, source: 'Direct', nationality: 'France', folio: 4920 },
  { id: 'IH-1058', name: 'David & Elena Stern', room: '304', type: 'Suite', arrived: '22 Apr', departing: '27 Apr', nights: 5, balance: 480, vip: false, source: 'Direct', nationality: 'Germany', folio: 12300 },
];

const CASHIER_TRANSACTIONS = [
  { id: 'TX-8421', time: '08:14', folio: 'IH-1042', guest: 'Robert Mensah', desc: 'Restaurant — breakfast', amount: 180, method: 'Charge to room' },
  { id: 'TX-8422', time: '08:42', folio: 'R1031', guest: 'Edward Coetzee', desc: 'Folio settlement', amount: 5680, method: 'Visa ••• 4112' },
  { id: 'TX-8423', time: '09:14', folio: '—', guest: 'Walk-in', desc: 'Restaurant — coffee + pastry', amount: 95, method: 'Cash' },
  { id: 'TX-8424', time: '09:55', folio: 'R1034', guest: 'Charlotte Devereux', desc: 'Folio settlement', amount: 4920, method: 'Mastercard ••• 8821' },
  { id: 'TX-8425', time: '10:18', folio: 'IH-1050', guest: 'Olivia Brown', desc: 'Spa — Massage 60min', amount: 75, method: 'Charge to room' },
  { id: 'TX-8426', time: '10:42', folio: 'IH-1054', guest: 'Hiroshi Yamada', desc: 'Mini-bar posting', amount: 165, method: 'Charge to room' },
  { id: 'TX-8427', time: '11:08', folio: 'R1033', guest: 'Ravi Pillai', desc: 'Folio settlement (City Ledger)', amount: 9450, method: 'TechAfrica Ltd' },
  { id: 'TX-8428', time: '11:24', folio: 'IH-1056', guest: 'Reyes', desc: 'Late dinner deposit', amount: 800, method: 'MTN MoMo' },
  { id: 'TX-8429', time: '11:48', folio: '—', guest: 'Walk-in', desc: 'Day pass — pool', amount: 240, method: 'Vodafone Cash' },
];

const TODAY_OFFSET = 3; // today is column index 3 in 14-day window

const generateStays = () => {
  const stays = [];
  const guestPool = [
    { name: 'Visser', vip: true, source: 'Direct' },
    { name: 'Holm', vip: false, source: 'Booking' },
    { name: 'Reyes', vip: true, source: 'Direct' },
    { name: 'Sato', vip: false, source: 'Expedia' },
    { name: 'Bauer', vip: false, source: 'Direct' },
    { name: 'Akinwale', vip: false, source: 'Agent' },
    { name: 'Nordström', vip: false, source: 'Booking' },
    { name: 'Coetzee', vip: false, source: 'Direct' },
    { name: 'Ndlovu', vip: false, source: 'Direct' },
    { name: 'Pillai', vip: false, source: 'Booking' },
    { name: 'Devereux', vip: true, source: 'Direct' },
    { name: "O'Hara", vip: false, source: 'Booking' },
    { name: 'Mendes', vip: false, source: 'Expedia' },
    { name: 'Patel', vip: false, source: 'Direct' },
    { name: 'Chen', vip: false, source: 'Booking' },
    { name: 'Williams', vip: false, source: 'Agent' },
    { name: 'Goldberg', vip: false, source: 'Direct' },
    { name: 'Yamada', vip: false, source: 'Booking' },
    { name: 'Bello', vip: false, source: 'Direct' },
    { name: 'Khoury', vip: false, source: 'Agent' },
  ];
  ROOMS.forEach((room, i) => {
    let cursor = -2 + (i * 7) % 11;
    while (cursor < 14) {
      const length = 1 + ((i * 13 + cursor * 7 + 11) % 5);
      if (cursor + length >= 0 && cursor < 14) {
        const guestIdx = (i * 3 + cursor + 17) % guestPool.length;
        const guest = guestPool[Math.abs(guestIdx)];
        const start = Math.max(cursor, 0);
        const end = Math.min(cursor + length, 14);
        stays.push({
          room: room.number,
          start,
          width: end - start,
          guest: guest.name,
          isVIP: guest.vip,
          source: guest.source,
          actualStart: cursor,
          length,
        });
      }
      cursor += length + 1 + (i % 3);
    }
  });
  return stays;
};

const STAYS = generateStays();
const OOO_ROOMS = ['207'];
const OOS_ROOMS = ['111'];

const DATE_LABELS = (() => {
  const labels = [];
  const base = new Date(2026, 3, 22); // 22 Apr 2026 = day 0
  for (let i = 0; i < 14; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    labels.push({
      day: d.getDate(),
      mon: d.toLocaleString('en', { month: 'short' }),
      dow: d.toLocaleString('en', { weekday: 'short' }),
      isToday: i === TODAY_OFFSET,
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
    });
  }
  return labels;
})();


// MODULES
const TapeChartModule = () => {
  const [selectedStay, setSelectedStay] = useState(null);
  const [filterSource, setFilterSource] = useState('all');

  const sources = ['all', 'Direct', 'Booking', 'Expedia', 'Agent'];

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Reservations</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Tape Chart</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>32 rooms · 14-day window · drag a reservation block to move it</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="ghost" icon={Filter}>Filter</Btn>
            <Btn variant="secondary" icon={Download}>Export A4</Btn>
            <Btn variant="primary" icon={Plus}>New Reservation</Btn>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-4">
        <div className="flex items-center gap-4 p-3" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1.5" style={{ border: `1px solid ${theme.rule}`, background: theme.bg }}><ChevronLeft size={14} style={{ color: theme.inkSoft }} /></button>
            <span className="font-serif" style={{ fontSize: '17px', color: theme.ink, letterSpacing: '-0.01em' }}>22 Apr — 5 May 2026</span>
            <button className="px-2 py-1.5" style={{ border: `1px solid ${theme.rule}`, background: theme.bg }}><ChevronRight size={14} style={{ color: theme.inkSoft }} /></button>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Source</span>
            {sources.map(s => (
              <button key={s} onClick={() => setFilterSource(s)} className="text-xs px-3 py-1.5"
                style={{
                  background: filterSource === s ? theme.ink : 'transparent',
                  color: filterSource === s ? theme.bgPanel : theme.inkSoft,
                  border: `1px solid ${filterSource === s ? theme.ink : theme.rule}`,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                {s === 'all' ? 'All' : s}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <TapeLegend />
        </div>

        <div style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, overflow: 'auto' }}>
          <div style={{ minWidth: '1200px' }}>
            {/* Date header row */}
            <div className="flex" style={{ borderBottom: `1px solid ${theme.rule}` }}>
              <div className="flex-shrink-0 px-3 py-2.5 text-[10px] uppercase"
                style={{ width: 130, color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600, borderRight: `1px solid ${theme.rule}`, background: theme.bg }}>
                Room · Type
              </div>
              {DATE_LABELS.map((d, i) => (
                <div key={i} className="flex-1 text-center py-2"
                  style={{
                    background: d.isToday ? theme.goldSoft : d.isWeekend ? theme.bgPanelAlt : 'transparent',
                    borderRight: i < 13 ? `1px solid ${theme.ruleSoft}` : 'none',
                    minWidth: 76,
                  }}>
                  <div className="text-[10px]" style={{ color: theme.inkMute, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{d.dow}</div>
                  <div className="font-serif" style={{ fontSize: '17px', color: d.isToday ? theme.gold : theme.ink, fontWeight: d.isToday ? 600 : 400, letterSpacing: '-0.02em' }}>{d.day}</div>
                </div>
              ))}
            </div>

            {/* Room rows */}
            {ROOMS.map((room, ri) => {
              const isOOO = OOO_ROOMS.includes(room.number);
              const isOOS = OOS_ROOMS.includes(room.number);
              const roomStays = STAYS.filter(s => s.room === room.number)
                .filter(s => filterSource === 'all' || s.source === filterSource);
              return (
                <div key={room.number} className="flex relative"
                  style={{ borderBottom: ri < ROOMS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none', height: 38 }}>
                  <div className="flex-shrink-0 px-3 py-2 flex items-center"
                    style={{
                      width: 130,
                      borderRight: `1px solid ${theme.rule}`,
                      background: isOOO ? theme.claySoft : isOOS ? theme.duskSoft : 'transparent',
                    }}>
                    <div>
                      <div className="text-sm" style={{ color: theme.ink, fontWeight: 500 }}>{room.number}</div>
                      <div className="text-[10px]" style={{ color: theme.inkMute, letterSpacing: '0.04em' }}>{room.type}</div>
                    </div>
                  </div>
                  <div className="flex-1 relative flex">
                    {DATE_LABELS.map((d, i) => (
                      <div key={i} className="flex-1"
                        style={{
                          borderRight: i < 13 ? `1px solid ${theme.ruleSoft}` : 'none',
                          background: d.isToday ? theme.goldSoft + '40' : d.isWeekend ? theme.ruleSoft + '50' : 'transparent',
                          minWidth: 76,
                        }} />
                    ))}
                    {(isOOO || isOOS) && (
                      <div className="absolute inset-y-1 left-1 right-1 flex items-center justify-center text-[10px] font-bold"
                        style={{
                          background: isOOO ? theme.clay : theme.dusk,
                          color: '#FBF7EE',
                          letterSpacing: '0.16em',
                        }}>
                        {isOOO ? 'OUT OF ORDER · WO-340' : 'OUT OF SERVICE · CARPET'}
                      </div>
                    )}
                    {!isOOO && !isOOS && roomStays.map((stay, si) => {
                      const left = (stay.start / 14) * 100;
                      const width = (stay.width / 14) * 100;
                      const isActive = selectedStay && selectedStay.room === room.number && selectedStay.start === stay.start;
                      const bg = stay.isVIP ? theme.gold
                        : stay.source === 'Direct' ? theme.teal
                        : stay.source === 'Booking' ? theme.leaf
                        : stay.source === 'Expedia' ? theme.dusk
                        : theme.hibiscus;
                      return (
                        <button key={si}
                          onClick={() => setSelectedStay({ ...stay, room: room.number, type: room.type, bg })}
                          className="absolute top-1 bottom-1 px-2 flex items-center text-xs overflow-hidden transition-all"
                          style={{
                            left: `calc(${left}% + 2px)`,
                            width: `calc(${width}% - 4px)`,
                            background: bg,
                            color: '#FBF7EE',
                            letterSpacing: '0.02em',
                            boxShadow: isActive ? `0 0 0 2px ${theme.ink}` : 'none',
                            zIndex: isActive ? 5 : 1,
                            borderRadius: '2px',
                          }}>
                          {stay.isVIP && <Sparkles size={10} className="mr-1 flex-shrink-0" />}
                          <span className="truncate font-medium">{stay.guest}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected stay details */}
        {selectedStay && (
          <div className="p-5 grid grid-cols-6 gap-6" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderTop: `3px solid ${selectedStay.bg}` }}>
            <div>
              <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Guest</div>
              <div className="font-serif text-lg flex items-center gap-2" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>
                {selectedStay.guest}
                {selectedStay.isVIP && <Pill tone="gold" size="sm"><Sparkles size={9} /> VIP</Pill>}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Room</div>
              <div className="font-serif text-lg" style={{ color: theme.ink }}>{selectedStay.room}</div>
              <div className="text-xs" style={{ color: theme.inkMute }}>{selectedStay.type}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Stay</div>
              <div className="font-serif text-lg" style={{ color: theme.ink }}>{selectedStay.length} nights</div>
            </div>
            <div>
              <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Source</div>
              <div className="font-serif text-lg" style={{ color: theme.ink }}>{selectedStay.source}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</div>
              <Pill tone="leaf"><Check size={10} /> Confirmed</Pill>
            </div>
            <div className="flex items-end justify-end gap-2">
              <Btn variant="ghost" size="sm" icon={Eye}>View</Btn>
              <Btn variant="secondary" size="sm">Folio</Btn>
              <Btn variant="primary" size="sm">Check In</Btn>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Today's Occupancy" value="87.5%" sublabel={`${ROOMS.filter(r => ['OC','OD','IN'].includes(r.status)).length} of ${ROOMS.length} rooms`} icon={Hotel} tone={theme.teal} />
          <KpiTile label="Arrivals Today" value={ARRIVALS.length} sublabel={`${ARRIVALS.filter(a => a.vip).length} VIP`} icon={ArrowDownRight} tone={theme.gold} />
          <KpiTile label="Departures Today" value={DEPARTURES.length} sublabel={`${DEPARTURES.filter(d => d.folioBalance > 0).length} pending payment`} icon={ArrowUpRight} />
          <KpiTile label="Out of Order" value={OOO_ROOMS.length + OOS_ROOMS.length} sublabel="not sellable" icon={AlertTriangle} tone={theme.clay} />
        </div>
      </div>
    </div>
  );
};

const TapeLegend = () => (
  <div className="flex items-center gap-4 text-xs" style={{ color: theme.inkSoft }}>
    <span className="flex items-center gap-1.5"><span className="w-3 h-3" style={{ background: theme.gold }} /> VIP</span>
    <span className="flex items-center gap-1.5"><span className="w-3 h-3" style={{ background: theme.teal }} /> Direct</span>
    <span className="flex items-center gap-1.5"><span className="w-3 h-3" style={{ background: theme.leaf }} /> Booking</span>
    <span className="flex items-center gap-1.5"><span className="w-3 h-3" style={{ background: theme.dusk }} /> Expedia</span>
    <span className="flex items-center gap-1.5"><span className="w-3 h-3" style={{ background: theme.hibiscus }} /> Agent</span>
    <span className="flex items-center gap-1.5"><span className="w-3 h-3" style={{ background: theme.clay }} /> OOO</span>
  </div>
);

// ============================================================================
// BUDGET VS. ACTUALS
// ============================================================================
const InHouseModule = () => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filtered = IN_HOUSE_GUESTS.filter(g => {
    if (filterType === 'departing-today' && g.departing !== '25 Apr') return false;
    if (filterType === 'vip' && !g.vip) return false;
    if (filterType === 'with-balance' && g.balance === 0) return false;
    if (search && !g.name.toLowerCase().includes(search.toLowerCase()) && !g.room.includes(search)) return false;
    return true;
  });

  const stats = {
    total: IN_HOUSE_GUESTS.length,
    vip: IN_HOUSE_GUESTS.filter(g => g.vip).length,
    departingToday: IN_HOUSE_GUESTS.filter(g => g.departing === '25 Apr').length,
    withBalance: IN_HOUSE_GUESTS.filter(g => g.balance > 0).length,
    totalBalance: IN_HOUSE_GUESTS.reduce((s, g) => s + g.balance, 0),
  };

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Front Desk</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>In-House Guests</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{stats.total} guests currently staying · live folio status</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Printer}>Print List</Btn>
            <Btn variant="primary" icon={MessageSquare}>Broadcast Message</Btn>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <KpiTile label="In-House" value={stats.total} sublabel="across 32 rooms" icon={Users} />
          <KpiTile label="VIP Guests" value={stats.vip} sublabel="anniversary, repeat" icon={Star} tone={theme.gold} />
          <KpiTile label="Departing Today" value={stats.departingToday} sublabel="check-out queue" icon={ArrowUpRight} tone={theme.dusk} />
          <KpiTile label="With Balance" value={stats.withBalance} sublabel="open folios" icon={DollarSign} tone={theme.gold} />
          <KpiTile label="Total Outstanding" value={cedi(stats.totalBalance)} sublabel="across folios" icon={Receipt} tone={stats.totalBalance > 0 ? theme.clay : theme.leaf} />
        </div>

        <div className="flex items-center gap-3 p-3" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
          <div className="flex items-center gap-2 px-3 py-1.5 flex-1 max-w-md" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, borderRadius: '2px' }}>
            <Search size={14} style={{ color: theme.inkMute }} />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guest name or room…"
              className="bg-transparent border-none outline-none text-sm flex-1" style={{ color: theme.ink }} />
          </div>
          <span className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>View</span>
          <div className="flex" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
            {[
              { id: 'all', label: 'All' },
              { id: 'vip', label: 'VIP' },
              { id: 'departing-today', label: 'Departing Today' },
              { id: 'with-balance', label: 'With Balance' },
            ].map(f => (
              <button key={f.id} onClick={() => setFilterType(f.id)} className="px-3 py-1.5 text-xs"
                style={{
                  background: filterType === f.id ? theme.ink : 'transparent',
                  color: filterType === f.id ? theme.bgPanel : theme.inkSoft,
                  letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500,
                }}>{f.label}</button>
            ))}
          </div>
        </div>

        <Card title={`In-House · ${filtered.length} guests`} accent={theme.teal} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Room</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Guest</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Stay</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Source</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Folio</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Balance</th>
                <th className="text-right py-3 px-5"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((g, i) => (
                <tr key={g.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none', background: g.vip ? theme.goldSoft + '30' : 'transparent' }}>
                  <td className="py-3 px-5">
                    <div className="font-mono" style={{ color: theme.ink, fontWeight: 500 }}>{g.room}</div>
                    <div className="text-[11px]" style={{ color: theme.inkMute }}>{g.type}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span style={{ color: theme.ink, fontWeight: 500 }}>{g.name}</span>
                      {g.vip && <Pill tone="gold" size="sm"><Sparkles size={9} /> VIP</Pill>}
                    </div>
                    <div className="text-[11px] mt-0.5" style={{ color: theme.inkMute }}>
                      <Globe size={9} className="inline mr-1" />{g.nationality}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>
                    <div>{g.arrived} → {g.departing}</div>
                    <div className="text-[11px]" style={{ color: theme.inkMute }}>{g.nights} nights</div>
                  </td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{g.source}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(g.folio)}</td>
                  <td className="py-3 px-3 text-right">
                    {g.balance > 0
                      ? <span className="font-serif" style={{ color: theme.clay, fontWeight: 600, fontSize: '15px' }}>{cedi(g.balance)}</span>
                      : <span className="font-mono text-sm" style={{ color: theme.leaf }}>₵ 0</span>}
                  </td>
                  <td className="py-3 px-5 text-right">
                    <Btn variant="ghost" size="sm" icon={Eye}>Folio</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// CASHIER SHIFT (FOM)
// ============================================================================
const CashierModule = () => {
  const [shiftStarted, setShiftStarted] = useState(true);

  const totals = {
    transactions: CASHIER_TRANSACTIONS.length,
    cardSettlements: CASHIER_TRANSACTIONS.filter(t => t.method.includes('Visa') || t.method.includes('Mastercard')).reduce((s, t) => s + t.amount, 0),
    cash: CASHIER_TRANSACTIONS.filter(t => t.method === 'Cash').reduce((s, t) => s + t.amount, 0),
    momo: CASHIER_TRANSACTIONS.filter(t => t.method.includes('MoMo') || t.method.includes('Vodafone Cash')).reduce((s, t) => s + t.amount, 0),
    cityLedger: CASHIER_TRANSACTIONS.filter(t => t.method.includes('TechAfrica')).reduce((s, t) => s + t.amount, 0),
    chargeToRoom: CASHIER_TRANSACTIONS.filter(t => t.method === 'Charge to room').reduce((s, t) => s + t.amount, 0),
  };
  const cashSettled = totals.cardSettlements + totals.cash + totals.momo + totals.cityLedger;
  const grandTotal = cashSettled + totals.chargeToRoom;

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Front Desk</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Cashier Shift</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>
              Shift: <span style={{ color: theme.ink, fontWeight: 500 }}>Amani Mlangeni</span> · Started 08:00 · {shiftStarted ? 'In progress' : 'Closed'}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="ghost" icon={RefreshCw}>Refresh</Btn>
            <Btn variant="primary" icon={Check} onClick={() => setShiftStarted(!shiftStarted)}>{shiftStarted ? 'Close Shift' : 'Start Shift'}</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="p-5 grid grid-cols-3 gap-6" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderTop: `3px solid ${theme.gold}` }}>
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>Opening Float</div>
            <div className="font-serif" style={{ fontSize: '28px', color: theme.ink, letterSpacing: '-0.02em' }}>{cedi(2000)}</div>
            <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>cash, opening drawer count</div>
          </div>
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>Settlements This Shift</div>
            <div className="font-serif" style={{ fontSize: '28px', color: theme.ink, letterSpacing: '-0.02em' }}>{cedi(cashSettled)}</div>
            <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>{CASHIER_TRANSACTIONS.length - CASHIER_TRANSACTIONS.filter(t => t.method === 'Charge to room').length} transactions</div>
          </div>
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>Expected Drawer at Close</div>
            <div className="font-serif" style={{ fontSize: '28px', color: theme.gold, letterSpacing: '-0.02em' }}>{cedi(2000 + totals.cash)}</div>
            <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>opening + cash receipts</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.teal}` }}>
            <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Card</div>
            <div className="font-serif text-xl" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>{cedi(totals.cardSettlements)}</div>
          </div>
          <div className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.gold}` }}>
            <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Cash</div>
            <div className="font-serif text-xl" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>{cedi(totals.cash)}</div>
          </div>
          <div className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.hibiscus}` }}>
            <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Mobile Money</div>
            <div className="font-serif text-xl" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>{cedi(totals.momo)}</div>
          </div>
          <div className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.dusk}` }}>
            <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>City Ledger</div>
            <div className="font-serif text-xl" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>{cedi(totals.cityLedger)}</div>
          </div>
          <div className="p-4" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.leaf}` }}>
            <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Charged to Room</div>
            <div className="font-serif text-xl" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>{cedi(totals.chargeToRoom)}</div>
          </div>
        </div>

        <Card title="Transactions This Shift" accent={theme.gold} padded={false}
          action={<Btn variant="primary" size="sm" icon={Plus}>New Transaction</Btn>}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Time · Ref</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Guest · Folio</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Description</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Method</th>
                <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {CASHIER_TRANSACTIONS.map((t, i) => (
                <tr key={t.id} style={{ borderBottom: i < CASHIER_TRANSACTIONS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5">
                    <div className="font-mono" style={{ color: theme.ink }}>{t.time}</div>
                    <div className="font-mono text-[10px]" style={{ color: theme.inkMute }}>{t.id}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div style={{ color: theme.ink, fontWeight: 500 }}>{t.guest}</div>
                    <div className="text-[11px] font-mono" style={{ color: theme.inkMute }}>{t.folio}</div>
                  </td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{t.desc}</td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{t.method}</td>
                  <td className="py-3 px-5 text-right font-mono" style={{ color: theme.ink, fontWeight: 500 }}>{cedi(t.amount)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: `2px solid ${theme.ink}`, background: theme.bgPanelAlt }}>
                <td className="py-3 px-5 font-serif" style={{ color: theme.ink, fontWeight: 600, fontSize: '15px' }} colSpan={4}>Shift Total</td>
                <td className="py-3 px-5 text-right font-serif" style={{ color: theme.gold, fontSize: '20px', letterSpacing: '-0.02em' }}>{cedi(grandTotal)}</td>
              </tr>
            </tfoot>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// HK ASSIGNMENTS (Housekeeper)
// ============================================================================

const FomComingSoon = ({ title }) => (
  <div className="p-4 md:p-6" style={{ background: theme.bg, minHeight: '100%' }}>
    <SectionHeader overline="Module" title={title} />
    <div className="p-12 text-center" style={{ background: theme.bgPanel, border: `1px dashed ${theme.rule}` }}>
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ background: theme.tealSoft, color: theme.teal }}><Sparkles size={20} /></div>
      <p className="font-serif text-lg mb-2" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Module defined in the BRD</p>
      <p className="text-sm" style={{ color: theme.inkSoft }}>To be built in the next sprint.</p>
    </div>
  </div>
);

// ============================================================================
// APP
// ============================================================================
const FomApp = () => {
  const [activeNav, setActiveNav] = useState('arrivals');
  let content;
  
  if (activeNav === 'arrivals') content = <ArrivalsModule />;
  else if (activeNav === 'tape-chart') content = <TapeChartModule />;
  else if (activeNav === 'rooms') content = <RoomStatusModule />;
  else if (activeNav === 'in-house') content = <InHouseModule />;
  else if (activeNav === 'cashier') content = <CashierModule />;
  else content = <FomComingSoon title="Front Office" />;
  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: theme.bg, fontFamily: '"Inter", system-ui, sans-serif', color: theme.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.rule}; }
      `}</style>
      <FomSidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <FomTopBar />
        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
};


// ============================================================================
// F&B MANAGER · Yaa Owusu
// ============================================================================
const FB_NAV = [
  { id: 'fb', label: 'F&B Performance', icon: Activity },
  { id: 'fb-pos', label: 'Restaurant POS', icon: Receipt },
  { id: 'fb-outlets', label: 'Outlets', icon: Utensils },
  { id: 'fb-menu', label: 'Menu Engineering', icon: ChefHat },
];
// ============================================================================
// SIDEBAR — F&B Manager
// ============================================================================
const FbSidebar = ({ activeNav, setActiveNav }) => (
  <aside className="hidden md:flex w-64 flex-shrink-0 flex-col" style={{ background: theme.navBg, color: '#FBF7EE' }}>
    <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <FloatLogo size="md" />
          <div className="text-[10px] mt-1" style={{ color: theme.gold, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Ghana</div>
        </div>
      </div>
    </div>
    <div className="px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium" style={{ background: theme.gold, color: theme.navBg, fontSize: '13px' }}>YO</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm" style={{ fontWeight: 500 }}>Yaa Owusu</div>
          <div className="text-[10px]" style={{ color: theme.gold, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>F&B Manager</div>
        </div>
      </div>
    </div>
    <nav className="flex-1 px-3 py-3 overflow-y-auto">
      {FB_NAV.map(item => {
        const Icon = item.icon;
        const active = activeNav === item.id;
        return (
          <button key={item.id} onClick={() => setActiveNav(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all text-sm"
            style={{ background: active ? 'rgba(185,135,64,0.15)' : 'transparent', color: active ? theme.gold : 'rgba(255,255,255,0.75)', borderLeft: active ? `3px solid ${theme.gold}` : '3px solid transparent', fontWeight: active ? 600 : 400 }}>
            <Icon size={15} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: theme.gold, color: theme.navBg, fontWeight: 700 }}>{item.badge}</span>}
          </button>
        );
      })}
    </nav>
    <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span>v1.0</span>
        <button className="hover:text-white"><LogOut size={12} /></button>
      </div>
    </div>
  </aside>
);

const FbTopBar = () => (
  <div className="flex items-center justify-between pl-16 pr-4 md:px-8 py-3 md:py-4" style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
    <div className="flex items-center gap-3 text-sm" style={{ color: theme.inkSoft }}>
      <Calendar size={14} /><span className="hidden md:inline">Saturday, 25 April 2026
    </span><span className="md:hidden">Sat 25 Apr</span></div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
        <Search size={13} style={{ color: theme.inkMute }} />
        <input placeholder="Search…" className="bg-transparent outline-none text-sm w-48" style={{ color: theme.ink }} />
      </div>
      <button className="relative p-2"><Bell size={15} style={{ color: theme.inkSoft }} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: theme.gold }} /></button>
    </div>
  </div>
);

// MOCK DATA
const POS_OUTLETS = [
  { id: 'rest', name: 'The Restaurant', icon: Utensils, color: theme.gold, openTabs: 6 },
  { id: 'bar', name: 'Sunset Bar', icon: Wine, color: theme.hibiscus, openTabs: 5 },
  { id: 'pool', name: 'Pool & Deck', icon: Coffee, color: theme.teal, openTabs: 2 },
  { id: 'rs', name: 'Room Service', icon: Hotel, color: theme.dusk, openTabs: 3 },
];

const POS_TABLES = [
  { id: 'T01', label: '1', seats: 2, status: 'free', x: 8, y: 12, shape: 'square' },
  { id: 'T02', label: '2', seats: 2, status: 'occupied', x: 22, y: 12, shape: 'square', covers: 2, server: 'Yao Mensah', openedAt: '19:42', total: 480, guest: 'Anneke V.' },
  { id: 'T03', label: '3', seats: 4, status: 'occupied', x: 38, y: 12, shape: 'square', covers: 4, server: 'Kwame A.', openedAt: '20:08', total: 1240, guest: 'Reyes party' },
  { id: 'T04', label: '4', seats: 4, status: 'reserved', x: 54, y: 12, shape: 'square', reservedFor: 'J. Akinwale · 21:00' },
  { id: 'T05', label: '5', seats: 2, status: 'free', x: 70, y: 12, shape: 'square' },
  { id: 'T06', label: '6', seats: 6, status: 'occupied', x: 86, y: 12, shape: 'rect', covers: 5, server: 'Yao Mensah', openedAt: '19:55', total: 1820, guest: 'Asante family' },
  { id: 'T07', label: '7', seats: 4, status: 'bill-printed', x: 8, y: 35, shape: 'round', covers: 4, server: 'Kwame A.', openedAt: '19:00', total: 920 },
  { id: 'T08', label: '8', seats: 2, status: 'free', x: 22, y: 35, shape: 'round' },
  { id: 'T09', label: '9', seats: 4, status: 'occupied', x: 40, y: 35, shape: 'round', covers: 3, server: 'Esi O.', openedAt: '20:14', total: 680 },
  { id: 'T10', label: '10', seats: 6, status: 'occupied', x: 60, y: 35, shape: 'rect', covers: 4, server: 'Esi O.', openedAt: '19:48', total: 1480, guest: 'Coetzee group' },
  { id: 'T11', label: '11', seats: 2, status: 'free', x: 78, y: 35, shape: 'round' },
  { id: 'L01', label: 'L1', seats: 6, status: 'occupied', x: 12, y: 62, shape: 'long', covers: 6, server: 'Yao Mensah', openedAt: '20:20', total: 1240, guest: 'Stern table' },
  { id: 'L02', label: 'L2', seats: 6, status: 'occupied', x: 36, y: 62, shape: 'long', covers: 4, server: 'Kwame A.', openedAt: '20:30', total: 480 },
  { id: 'L03', label: 'L3', seats: 6, status: 'free', x: 60, y: 62, shape: 'long' },
  { id: 'L04', label: 'L4', seats: 4, status: 'reserved', x: 84, y: 62, shape: 'long', reservedFor: 'Honeymoon · 20:45' },
  { id: 'B01', label: 'B1', seats: 4, status: 'occupied', x: 12, y: 86, shape: 'square', covers: 2, server: 'Esi O.', openedAt: '20:38', total: 220 },
  { id: 'B02', label: 'B2', seats: 4, status: 'free', x: 30, y: 86, shape: 'square' },
];

const POS_CATEGORIES = [
  { id: 'starters', name: 'Starters', icon: Utensils },
  { id: 'mains', name: 'Mains', icon: ChefHat },
  { id: 'lake', name: 'From the Lake', icon: Sparkles },
  { id: 'sides', name: 'Sides', icon: Hash },
  { id: 'desserts', name: 'Desserts', icon: Coffee },
  { id: 'drinks', name: 'Drinks', icon: Wine },
];

const POS_MENU = [
  { id: 'm01', cat: 'starters', name: 'Goat Pepper Soup', price: 65, station: 'kitchen', desc: 'Spiced broth, tender goat meat', allergens: [], available: true },
  { id: 'm02', cat: 'starters', name: 'Kelewele', price: 48, station: 'kitchen', desc: 'Spiced fried plantain, peanut chutney', allergens: ['nuts'], available: true },
  { id: 'm03', cat: 'starters', name: 'Akosombo Ceviche', price: 95, station: 'kitchen', desc: 'Fresh tilapia, lime, hibiscus', allergens: ['fish'], available: true },
  { id: 'm04', cat: 'starters', name: 'Coconut Crusted Prawns', price: 110, station: 'kitchen', desc: 'Lake prawns, hibiscus dipping sauce', allergens: ['shellfish'], available: false },
  { id: 'm10', cat: 'mains', name: 'Jollof with Grilled Chicken', price: 160, station: 'kitchen', desc: 'Smoky tomato rice, half chicken', allergens: [], available: true },
  { id: 'm11', cat: 'mains', name: 'Banku & Tilapia', price: 150, station: 'kitchen', desc: 'Grilled whole tilapia, banku, shito', allergens: ['fish'], available: true },
  { id: 'm12', cat: 'mains', name: 'Volta Beef Striploin (250g)', price: 280, station: 'kitchen', desc: 'Pan-seared, peppercorn jus', allergens: [], available: true },
  { id: 'm13', cat: 'mains', name: 'Vegetable Red Red', price: 110, station: 'kitchen', desc: 'Bean stew, fried plantain', allergens: [], available: true },
  { id: 'm20', cat: 'lake', name: 'Tilapia from the Lake', price: 170, station: 'kitchen', desc: "Whole tilapia, char-grilled · today's catch", allergens: ['fish'], available: true, signature: true },
  { id: 'm21', cat: 'lake', name: 'Lakeside Prawn Skewers', price: 220, station: 'kitchen', desc: '3 skewers, jollof rice, slaw', allergens: ['shellfish'], available: true },
  { id: 'm22', cat: 'lake', name: 'Volta Catch Curry', price: 185, station: 'kitchen', desc: 'Mixed catch, coconut, basmati', allergens: ['fish'], available: true },
  { id: 'm30', cat: 'sides', name: 'Plantain (4)', price: 28, station: 'kitchen', desc: '', allergens: [], available: true },
  { id: 'm31', cat: 'sides', name: 'Jollof Rice', price: 32, station: 'kitchen', desc: '', allergens: [], available: true },
  { id: 'm32', cat: 'sides', name: 'Banku', price: 24, station: 'kitchen', desc: '', allergens: [], available: true },
  { id: 'm40', cat: 'desserts', name: 'Coconut Tart', price: 65, station: 'kitchen', desc: 'Toasted coconut, palm sugar', allergens: ['gluten', 'dairy'], available: true },
  { id: 'm41', cat: 'desserts', name: 'Hibiscus Sorbet', price: 48, station: 'kitchen', desc: '', allergens: [], available: true },
  { id: 'd01', cat: 'drinks', name: 'Volta Sunset Cocktail', price: 80, station: 'bar', desc: 'Hibiscus, gin, citrus', allergens: [], available: true, signature: true },
  { id: 'd02', cat: 'drinks', name: 'Star Beer', price: 50, station: 'bar', desc: '', allergens: [], available: true },
  { id: 'd03', cat: 'drinks', name: 'Club Beer', price: 50, station: 'bar', desc: '', allergens: [], available: true },
  { id: 'd04', cat: 'drinks', name: 'House Red (glass)', price: 70, station: 'bar', desc: '', allergens: [], available: true },
  { id: 'd05', cat: 'drinks', name: 'House White (glass)', price: 70, station: 'bar', desc: '', allergens: [], available: true },
  { id: 'd06', cat: 'drinks', name: 'Sparkling Water 500ml', price: 25, station: 'bar', desc: '', allergens: [], available: true },
  { id: 'd07', cat: 'drinks', name: 'Hibiscus Mocktail', price: 45, station: 'bar', desc: '', allergens: [], available: true },
];

const POS_STATUS = {
  free: { label: 'Free', color: theme.leaf, soft: theme.leafSoft },
  occupied: { label: 'Occupied', color: theme.gold, soft: theme.goldSoft },
  reserved: { label: 'Reserved', color: theme.dusk, soft: theme.duskSoft },
  'bill-printed': { label: 'Bill printed', color: theme.hibiscus, soft: theme.hibiscusSoft },
};


// MODULES
const POSTable = ({ table, onClick, selected }) => {
  const s = POS_STATUS[table.status];
  const dim = { square: { w: 9, h: 7 }, round: { w: 8, h: 7 }, rect: { w: 12, h: 7 }, long: { w: 16, h: 5 } }[table.shape] || { w: 9, h: 7 };
  return (
    <button onClick={() => onClick(table)} className="absolute transition-all hover:scale-105"
      style={{
        left: `${table.x}%`, top: `${table.y}%`, width: `${dim.w}%`, height: `${dim.h}%`,
        background: s.soft, border: `2px solid ${s.color}`,
        borderRadius: table.shape === 'round' ? '50%' : '4px',
        boxShadow: selected ? `0 0 0 3px ${theme.ink}` : 'none',
        zIndex: selected ? 5 : 1, cursor: 'pointer', padding: 0,
      }}>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="font-serif" style={{ fontSize: '15px', color: s.color, letterSpacing: '-0.02em', fontWeight: 600, lineHeight: 1 }}>{table.label}</div>
        <div className="text-[9px]" style={{ color: s.color, opacity: 0.7 }}>
          {table.status === 'occupied' ? `${table.covers}/${table.seats} · ${cedi(table.total)}` :
           table.status === 'reserved' ? 'Reserved' :
           table.status === 'bill-printed' ? cedi(table.total) :
           `${table.seats} seats`}
        </div>
      </div>
    </button>
  );
};

const POSFloorPlan = ({ tables, onSelectTable, selectedTableId }) => (
  <div className="relative" style={{ background: theme.bgPanelAlt, border: `1px solid ${theme.rule}`, height: 540, overflow: 'hidden' }}>
    <div className="absolute" style={{ left: '6%', top: '4%', color: theme.inkMute, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700 }}>Indoor Dining</div>
    <div className="absolute" style={{ left: '6%', top: '54%', color: theme.inkMute, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700 }}>Lakeside Deck</div>
    <div className="absolute" style={{ left: '6%', top: '78%', color: theme.inkMute, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700 }}>Bar Area</div>
    <div className="absolute" style={{ left: '4%', right: '4%', top: '50%', height: 1, background: theme.rule, opacity: 0.5 }} />
    <div className="absolute" style={{ left: '4%', right: '4%', top: '76%', height: 1, background: theme.rule, opacity: 0.5 }} />
    <div className="absolute" style={{ right: 16, top: '54%', bottom: '24%', width: 30, background: `linear-gradient(180deg, ${theme.tealSoft}, ${theme.teal}30)`, borderRadius: '4px', opacity: 0.4 }} />
    {tables.map(t => <POSTable key={t.id} table={t} onClick={onSelectTable} selected={selectedTableId === t.id} />)}
  </div>
);

const POSOrderEntry = ({ table, order, setOrder, onSendKOT, onClose, onPrintBill }) => {
  const [activeCategory, setActiveCategory] = useState('starters');
  const [search, setSearch] = useState('');
  const items = POS_MENU.filter(m => search ? m.name.toLowerCase().includes(search.toLowerCase()) : m.cat === activeCategory);
  const addItem = (mi) => setOrder(prev => {
    const ex = prev.find(o => o.id === mi.id && o.status === 'new');
    if (ex) return prev.map(o => o.id === mi.id && o.status === 'new' ? { ...o, qty: o.qty + 1 } : o);
    return [...prev, { ...mi, qty: 1, status: 'new' }];
  });
  const removeItem = (idx) => setOrder(prev => prev.filter((_, i) => i !== idx));
  const updateQty = (idx, delta) => setOrder(prev => prev.map((o, i) => i === idx ? { ...o, qty: o.qty + delta } : o).filter(o => o.qty > 0));
  const subtotal = order.reduce((s, o) => s + o.price * o.qty, 0);
  const service = subtotal * 0.10;
  const vat = subtotal * 0.15;
  const total = subtotal + service + vat;
  const newItems = order.filter(o => o.status === 'new');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0" style={{ height: 'calc(100vh - 180px)' }}>
      <div className="col-span-2 flex flex-col" style={{ background: theme.bgPanel, borderRight: `1px solid ${theme.rule}` }}>
        <div className="p-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${theme.rule}` }}>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
              <ArrowLeft size={14} style={{ color: theme.inkSoft }} />
            </button>
            <div>
              <div className="text-[10px] uppercase" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>Table {table.label}</div>
              <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>{table.guest || `Cover for ${table.covers || table.seats}`}</div>
              <div className="text-xs mt-0.5" style={{ color: theme.inkSoft }}>{table.openedAt && `Opened ${table.openedAt} · `}{table.server || 'No server'} · {table.covers || 0} covers</div>
            </div>
          </div>
        </div>
        <div className="px-5 pt-4 pb-3" style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
          <div className="flex items-center gap-2 px-3 py-2 mb-3" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
            <Search size={14} style={{ color: theme.inkMute }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search menu items…" className="bg-transparent outline-none text-sm flex-1" style={{ color: theme.ink }} />
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {POS_CATEGORIES.map(c => {
              const Icon = c.icon;
              const active = !search && activeCategory === c.id;
              return (
                <button key={c.id} onClick={() => { setActiveCategory(c.id); setSearch(''); }}
                  className="flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap"
                  style={{ background: active ? theme.ink : 'transparent', color: active ? theme.bgPanel : theme.inkSoft, border: `1px solid ${active ? theme.ink : theme.rule}`, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 500 }}>
                  <Icon size={12} />{c.name}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map(m => (
              <button key={m.id} onClick={() => m.available && addItem(m)} disabled={!m.available}
                className="p-4 text-left transition-all hover:translate-y-[-1px] disabled:opacity-40"
                style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: m.signature ? `3px solid ${theme.gold}` : `1px solid ${theme.rule}`, cursor: m.available ? 'pointer' : 'not-allowed' }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-serif" style={{ fontSize: '15px', color: theme.ink, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{m.name}</div>
                    {m.signature && <Pill tone="gold" size="sm"><Star size={9} /> Signature</Pill>}
                  </div>
                  <span className="font-serif" style={{ fontSize: '17px', color: theme.gold, letterSpacing: '-0.02em' }}>{cedi(m.price)}</span>
                </div>
                {m.desc && <div className="text-[11px] leading-tight" style={{ color: theme.inkSoft }}>{m.desc}</div>}
                <div className="flex items-center gap-1 mt-2">
                  {m.allergens.map(a => <Pill key={a} tone="clay" size="sm">{a}</Pill>)}
                  {!m.available && <Pill tone="neutral" size="sm">86&apos;d</Pill>}
                  <span className="ml-auto text-[10px]" style={{ color: theme.inkMute, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>{m.station}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-1 flex flex-col" style={{ background: theme.bgPanelAlt }}>
        <div className="px-5 py-4" style={{ borderBottom: `1px solid ${theme.rule}` }}>
          <div className="text-[10px] uppercase mb-1" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>Order</div>
          <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>Table {table.label}</div>
          <div className="text-xs" style={{ color: theme.inkSoft }}>{order.length} item{order.length !== 1 ? 's' : ''}</div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {newItems.length > 0 && (
            <div>
              <div className="text-[10px] uppercase mb-2 flex items-center gap-2" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.gold }} />New · not sent
              </div>
              <div className="space-y-2">
                {order.map((o, i) => o.status !== 'new' ? null : (
                  <div key={i} className="p-3" style={{ background: theme.bgPanel, border: `1px solid ${theme.gold}30`, borderLeft: `3px solid ${theme.gold}` }}>
                    <div className="flex items-start justify-between mb-1">
                      <div className="text-sm" style={{ color: theme.ink, fontWeight: 500 }}>{o.name}</div>
                      <button onClick={() => removeItem(i)} className="ml-2 mt-0.5"><Trash2 size={12} style={{ color: theme.inkMute }} /></button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQty(i, -1)} className="w-6 h-6 flex items-center justify-center" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}><Minus size={11} /></button>
                        <span className="px-3 text-sm font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{o.qty}</span>
                        <button onClick={() => updateQty(i, 1)} className="w-6 h-6 flex items-center justify-center" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}><Plus size={11} /></button>
                      </div>
                      <span className="font-mono text-sm" style={{ color: theme.ink }}>{cedi(o.price * o.qty)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {order.filter(o => o.status === 'sent').length > 0 && (
            <div>
              <div className="text-[10px] uppercase mb-2 flex items-center gap-2" style={{ color: theme.leaf, letterSpacing: '0.18em', fontWeight: 700 }}>
                <Check size={11} />Sent to kitchen
              </div>
              <div className="space-y-1">
                {order.map((o, i) => o.status !== 'sent' ? null : (
                  <div key={i} className="flex items-center justify-between text-sm py-1.5">
                    <span style={{ color: theme.inkSoft }}>{o.qty}× {o.name}</span>
                    <span className="font-mono" style={{ color: theme.inkSoft }}>{cedi(o.price * o.qty)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {order.length === 0 && (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: theme.ruleSoft, color: theme.inkMute }}><Receipt size={20} /></div>
              <div className="text-sm" style={{ color: theme.inkSoft }}>No items yet</div>
              <div className="text-xs mt-1" style={{ color: theme.inkMute }}>Tap menu items to add to order</div>
            </div>
          )}
        </div>
        {order.length > 0 && (
          <div className="px-5 py-4" style={{ borderTop: `1px solid ${theme.rule}`, background: theme.bgPanel }}>
            <div className="space-y-1.5 mb-4 text-sm">
              <div className="flex justify-between"><span style={{ color: theme.inkSoft }}>Subtotal</span><span className="font-mono" style={{ color: theme.ink }}>{cedi(subtotal)}</span></div>
              <div className="flex justify-between"><span style={{ color: theme.inkSoft }}>Service (10%)</span><span className="font-mono" style={{ color: theme.ink }}>{cedi(service)}</span></div>
              <div className="flex justify-between"><span style={{ color: theme.inkSoft }}>VAT + Tourism Levy (15%)</span><span className="font-mono" style={{ color: theme.ink }}>{cedi(vat)}</span></div>
              <div className="flex justify-between items-baseline pt-2" style={{ borderTop: `1px solid ${theme.rule}` }}>
                <span className="font-serif text-base" style={{ color: theme.ink, fontWeight: 600 }}>Total</span>
                <span className="font-serif" style={{ fontSize: '24px', color: theme.gold, letterSpacing: '-0.02em' }}>{cedi(total)}</span>
              </div>
            </div>
            <div className="space-y-2">
              {newItems.length > 0 && <Btn variant="primary" icon={Send} onClick={() => onSendKOT(newItems)}>Send {newItems.length} item{newItems.length !== 1 ? 's' : ''} to kitchen</Btn>}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <Btn variant="secondary" size="md" icon={Receipt} onClick={onPrintBill}>Print Bill</Btn>
                <Btn variant="ghost" size="md" icon={Hotel}>Charge to Room</Btn>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const POSKOTModal = ({ items, table, onClose }) => {
  const ticketNumber = 'KOT-' + Math.floor(Math.random() * 9000 + 1000);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8" style={{ background: 'rgba(21,32,31,0.6)' }} onClick={onClose}>
      <div className="w-96" style={{ background: '#FFFEF8', boxShadow: '0 12px 48px rgba(0,0,0,0.3)' }} onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-5 text-center" style={{ borderBottom: `2px dashed ${theme.ink}` }}>
          <div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.24em', fontWeight: 700 }}>The Float · Akosombo</div>
          <div className="font-serif mt-1" style={{ fontSize: '22px', color: theme.ink, letterSpacing: '-0.02em' }}>Kitchen Order Ticket</div>
          <div className="text-xs mt-2 font-mono" style={{ color: theme.inkSoft }}>{ticketNumber}</div>
        </div>
        <div className="px-6 py-4 grid grid-cols-2 gap-2 text-sm" style={{ borderBottom: `1px dashed ${theme.rule}` }}>
          <div><div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Table</div><div className="font-mono font-bold text-lg" style={{ color: theme.ink }}>{table.label}</div></div>
          <div className="text-right"><div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Time</div><div className="font-mono" style={{ color: theme.ink }}>{new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}</div></div>
          <div><div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Server</div><div style={{ color: theme.ink }}>{table.server || 'Yao Mensah'}</div></div>
          <div className="text-right"><div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Covers</div><div className="font-mono" style={{ color: theme.ink }}>{table.covers || '—'}</div></div>
        </div>
        <div className="px-6 py-4">
          <div className="space-y-2.5">
            {items.map((item, i) => (
              <div key={i} className="flex items-baseline gap-3 py-1.5" style={{ borderBottom: i < items.length - 1 ? `1px dashed ${theme.ruleSoft}` : 'none' }}>
                <span className="font-mono font-bold text-lg" style={{ color: theme.ink, width: 30 }}>{item.qty}×</span>
                <div className="flex-1">
                  <div style={{ color: theme.ink, fontWeight: 600 }}>{item.name}</div>
                  {item.allergens && item.allergens.length > 0 && <div className="text-[11px] mt-0.5" style={{ color: theme.clay, fontWeight: 600 }}>⚠ {item.allergens.join(', ')}</div>}
                </div>
                <span className="text-[10px]" style={{ color: theme.inkMute, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>{item.station}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 text-center" style={{ borderTop: `2px dashed ${theme.ink}` }}>
          <div className="text-[10px] mb-3" style={{ color: theme.inkMute, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>Sent to Kitchen · Bar · Pass</div>
          <Btn variant="primary" icon={Printer} onClick={onClose}>Print &amp; Close</Btn>
        </div>
      </div>
    </div>
  );
};

const POSBillModal = ({ table, order, onClose }) => {
  const subtotal = order.reduce((s, o) => s + o.price * o.qty, 0);
  const service = subtotal * 0.10;
  const vat = subtotal * 0.15;
  const total = subtotal + service + vat;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8" style={{ background: 'rgba(21,32,31,0.6)' }} onClick={onClose}>
      <div className="w-[420px] max-h-[90vh] flex flex-col" style={{ background: '#FFFEF8', boxShadow: '0 12px 48px rgba(0,0,0,0.3)' }} onClick={(e) => e.stopPropagation()}>
        <div className="px-7 py-5 text-center" style={{ borderBottom: `1px solid ${theme.rule}` }}>
          <div className="flex justify-center mb-2" style={{ background: theme.navBg, padding: '10px', display: 'inline-flex', margin: '0 auto' }}>
            <FloatLogo size="md" />
          </div>
          <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em', textAlign: 'center' }}>The Float</div>
          <div className="text-[10px]" style={{ color: theme.inkMute, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Akosombo · Lake Volta · Ghana</div>
        </div>
        <div className="px-7 py-4 flex-1 overflow-y-auto">
          <table className="w-full text-sm">
            <tbody>
              {order.map((o, i) => (
                <tr key={i} style={{ borderBottom: `1px dashed ${theme.ruleSoft}` }}>
                  <td className="py-2" style={{ color: theme.ink }}>{o.qty}× {o.name}</td>
                  <td className="py-2 text-right font-mono" style={{ color: theme.ink }}>{cedi(o.price * o.qty)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 space-y-1.5 text-sm">
            <div className="flex justify-between"><span style={{ color: theme.inkSoft }}>Subtotal</span><span className="font-mono">{cedi(subtotal)}</span></div>
            <div className="flex justify-between"><span style={{ color: theme.inkSoft }}>Service (10%)</span><span className="font-mono">{cedi(service)}</span></div>
            <div className="flex justify-between"><span style={{ color: theme.inkSoft }}>VAT + Tourism Levy (15%)</span><span className="font-mono">{cedi(vat)}</span></div>
            <div className="flex justify-between items-baseline pt-3" style={{ borderTop: `2px solid ${theme.ink}` }}>
              <span className="font-serif text-base" style={{ color: theme.ink, fontWeight: 700 }}>Total Due</span>
              <span className="font-serif" style={{ fontSize: '26px', color: theme.gold, letterSpacing: '-0.02em' }}>{cedi(total)}</span>
            </div>
          </div>
        </div>
        <div className="px-7 py-4 space-y-2" style={{ borderTop: `1px solid ${theme.rule}` }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <Btn variant="secondary" size="md" icon={CreditCard}>Card</Btn>
            <Btn variant="secondary" size="md" icon={Phone}>Mobile Money</Btn>
            <Btn variant="secondary" size="md" icon={Hotel}>Charge to Room</Btn>
            <Btn variant="ghost" size="md" icon={DollarSign}>Cash</Btn>
          </div>
          <Btn variant="primary" icon={Printer} onClick={onClose}>Print &amp; Close Table</Btn>
        </div>
      </div>
    </div>
  );
};

const POSModule = () => {
  const [activeOutlet, setActiveOutlet] = useState('rest');
  const [selectedTable, setSelectedTable] = useState(null);
  const [order, setOrder] = useState([]);
  const [showKOT, setShowKOT] = useState(null);
  const [showBill, setShowBill] = useState(false);
  const [tables, setTables] = useState(POS_TABLES);

  const outlet = POS_OUTLETS.find(o => o.id === activeOutlet);
  const stats = {
    free: tables.filter(t => t.status === 'free').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    reserved: tables.filter(t => t.status === 'reserved').length,
    revenue: tables.filter(t => t.status === 'occupied' || t.status === 'bill-printed').reduce((s, t) => s + (t.total || 0), 0),
    covers: tables.filter(t => t.status === 'occupied').reduce((s, t) => s + (t.covers || 0), 0),
  };

  const handleSelectTable = (t) => {
    setSelectedTable(t);
    if (t.status === 'occupied' || t.status === 'bill-printed') {
      setOrder([
        { id: 'm20', name: 'Tilapia from the Lake', price: 170, qty: 2, status: 'sent', station: 'kitchen', allergens: ['fish'] },
        { id: 'd02', name: 'Star Beer', price: 50, qty: 2, status: 'sent', station: 'bar', allergens: [] },
        { id: 'm31', name: 'Jollof Rice', price: 32, qty: 1, status: 'sent', station: 'kitchen', allergens: [] },
      ]);
    } else setOrder([]);
  };
  const handleSendKOT = (items) => {
    setShowKOT(items);
    setTimeout(() => setOrder(prev => prev.map(o => o.status === 'new' ? { ...o, status: 'sent' } : o)), 100);
  };

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Restaurant POS</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>{outlet.name}</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Saturday Dinner Service · live floor plan</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="ghost" icon={RefreshCw}>Refresh</Btn>
            <Btn variant="primary" icon={Plus}>Walk-in Table</Btn>
          </div>
        </div>
        <div className="px-8 flex gap-1" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
          {POS_OUTLETS.map(o => {
            const Icon = o.icon;
            const active = activeOutlet === o.id;
            return (
              <button key={o.id} onClick={() => { setActiveOutlet(o.id); setSelectedTable(null); }}
                className="flex items-center gap-2 px-4 py-3 text-sm transition-all"
                style={{ color: active ? theme.ink : theme.inkSoft, fontWeight: active ? 600 : 400, borderBottom: active ? `2px solid ${o.color}` : '2px solid transparent', marginBottom: '-1px' }}>
                <Icon size={14} />{o.name}
                {o.openTabs > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: o.color, color: '#FBF7EE', fontWeight: 700 }}>{o.openTabs}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {selectedTable ? (
        <POSOrderEntry table={selectedTable} order={order} setOrder={setOrder} onSendKOT={handleSendKOT} onClose={() => { setSelectedTable(null); setOrder([]); }} onPrintBill={() => setShowBill(true)} />
      ) : (
        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <KpiTile label="Free Tables" value={stats.free} sublabel="available now" icon={CircleCheck} tone={theme.leaf} />
            <KpiTile label="Occupied" value={stats.occupied} sublabel={`${stats.covers} covers`} icon={Users} tone={theme.gold} />
            <KpiTile label="Reserved" value={stats.reserved} sublabel="next 2 hours" icon={Clock} tone={theme.dusk} />
            <KpiTile label="Open Revenue" value={cedi(stats.revenue)} sublabel="in flight" icon={DollarSign} tone={theme.gold} />
            <KpiTile label="Avg / Cover" value={stats.covers > 0 ? cedi(Math.round(stats.revenue / stats.covers)) : '—'} sublabel="tonight" icon={Receipt} tone={theme.teal} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>Floor plan · {outlet.name}</h2>
              <div className="flex items-center gap-3 text-xs">
                {Object.entries(POS_STATUS).map(([code, m]) => (
                  <span key={code} className="flex items-center gap-1.5" style={{ color: theme.inkSoft }}>
                    <span className="w-3 h-3 rounded-sm" style={{ background: m.soft, border: `2px solid ${m.color}` }} />{m.label}
                  </span>
                ))}
              </div>
            </div>
            <POSFloorPlan tables={tables} onSelectTable={handleSelectTable} selectedTableId={selectedTable?.id} />
            <div className="mt-3 p-3 flex items-start gap-2" style={{ background: theme.bgPanelAlt, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.gold}` }}>
              <Sparkles size={14} style={{ color: theme.gold, marginTop: 2 }} />
              <div className="text-xs" style={{ color: theme.inkSoft }}>
                <span style={{ color: theme.ink, fontWeight: 600 }}>Tap any table </span>to open order entry. Free tables start a new cover; occupied tables show the open ticket.
              </div>
            </div>
          </div>
        </div>
      )}

      {showKOT && <POSKOTModal items={showKOT} table={selectedTable} onClose={() => setShowKOT(null)} />}
      {showBill && <POSBillModal table={selectedTable} order={order} onClose={() => setShowBill(false)} />}
    </div>
  );
};

// ============================================================================
// COMING SOON PLACEHOLDER
// ============================================================================

const FbComingSoon = ({ title }) => (
  <div className="p-4 md:p-6" style={{ background: theme.bg, minHeight: '100%' }}>
    <SectionHeader overline="Module" title={title} />
    <div className="p-12 text-center" style={{ background: theme.bgPanel, border: `1px dashed ${theme.rule}` }}>
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ background: theme.tealSoft, color: theme.teal }}><Sparkles size={20} /></div>
      <p className="font-serif text-lg mb-2" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Module defined in the BRD</p>
      <p className="text-sm" style={{ color: theme.inkSoft }}>To be built in the next sprint.</p>
    </div>
  </div>
);

// ============================================================================
// APP
// ============================================================================
const FbApp = () => {
  const [activeNav, setActiveNav] = useState('fb');
  let content;
  
  if (activeNav === 'fb-pos') content = <POSModule />;
  else if (activeNav === 'fb-outlets') content = <FBModule initialTab="outlets" />;
  else if (activeNav === 'fb-menu') content = <FBModule initialTab="menu" />;
  else content = <FBModule initialTab="overview" />;
  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: theme.bg, fontFamily: '"Inter", system-ui, sans-serif', color: theme.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.rule}; }
      `}</style>
      <FbSidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <FbTopBar />
        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
};


// ============================================================================
// EXECUTIVE CHEF · Chef Olamide Adeyemi
// ============================================================================
const CHEF_NAV = [
  { id: 'chef-overview', label: 'Kitchen Overview', icon: ChefHat },
  { id: 'chef-recipes', label: 'Recipes & Cost', icon: BookOpen },
  { id: 'chef-production', label: 'Production Sheet', icon: ClipboardList },
  { id: 'chef-variance', label: 'Theoretical vs Actual', icon: Activity },
  { id: 'chef-wastage', label: 'Wastage Log', icon: Trash2 },
  { id: 'chef-stations', label: 'Stations & Team', icon: Users },
];

const chef_ME = { initials: 'CO', name: 'Chef Olamide Adeyemi', role: 'Executive Chef' };


// ============================================================================
// SIDEBAR — Executive Chef
// ============================================================================
const ChefSidebar = ({ activeNav, setActiveNav }) => (
  <aside className="hidden md:flex w-64 flex-shrink-0 flex-col" style={{ background: theme.navBg, color: '#FBF7EE' }}>
    <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <FloatLogo size="md" />
          <div className="text-[10px] mt-1" style={{ color: theme.gold, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Ghana</div>
        </div>
      </div>
    </div>
    <div className="px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium" style={{ background: theme.gold, color: theme.navBg, fontSize: '13px' }}>{chef_ME.initials}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm" style={{ fontWeight: 500 }}>{chef_ME.name}</div>
          <div className="text-[10px]" style={{ color: theme.gold, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>{chef_ME.role}</div>
        </div>
      </div>
    </div>
    <nav className="flex-1 px-3 py-3 overflow-y-auto">
      {CHEF_NAV.map(item => {
        const Icon = item.icon;
        const active = activeNav === item.id;
        return (
          <button key={item.id} onClick={() => setActiveNav(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all text-sm"
            style={{ background: active ? 'rgba(185,135,64,0.15)' : 'transparent', color: active ? theme.gold : 'rgba(255,255,255,0.75)', borderLeft: active ? `3px solid ${theme.gold}` : '3px solid transparent', fontWeight: active ? 600 : 400 }}>
            <Icon size={15} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: theme.gold, color: theme.navBg, fontWeight: 700 }}>{item.badge}</span>}
          </button>
        );
      })}
    </nav>
    <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span>v1.0</span>
        <button className="hover:text-white"><LogOut size={12} /></button>
      </div>
    </div>
  </aside>
);

const ChefTopBar = () => (
  <div className="flex items-center justify-between pl-16 pr-4 md:px-8 py-3 md:py-4" style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
    <div className="flex items-center gap-3 text-sm" style={{ color: theme.inkSoft }}>
      <Calendar size={14} /><span className="hidden md:inline">Saturday, 25 April 2026 · Service starts 18:00
    </span><span className="md:hidden">Sat 25 Apr</span></div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
        <Search size={13} style={{ color: theme.inkMute }} />
        <input placeholder="Search recipes, ingredients…" className="bg-transparent outline-none text-sm w-56" style={{ color: theme.ink }} />
      </div>
      <button className="relative p-2"><Bell size={15} style={{ color: theme.inkSoft }} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: theme.gold }} /></button>
    </div>
  </div>
);

// ============================================================================
// CHEF MOCK DATA
// ============================================================================
const INGREDIENTS = [
  { id: 'ING-001', name: 'Lake fish (tilapia)', unit: 'kg', cost: 32, supplier: 'Coastal Seafoods', stockOnHand: 22, par: 25, allergens: ['fish'] },
  { id: 'ING-002', name: 'Beef striploin', unit: 'kg', cost: 165, supplier: 'Akosombo Fresh Market', stockOnHand: 8, par: 12, allergens: [] },
  { id: 'ING-003', name: 'Goat meat', unit: 'kg', cost: 95, supplier: 'Akosombo Fresh Market', stockOnHand: 6, par: 8, allergens: [] },
  { id: 'ING-004', name: 'Lake prawns', unit: 'kg', cost: 220, supplier: 'Coastal Seafoods', stockOnHand: 0, par: 4, allergens: ['shellfish'] },
  { id: 'ING-005', name: 'Plantain', unit: 'kg', cost: 5, supplier: 'Akosombo Fresh Market', stockOnHand: 35, par: 40, allergens: [] },
  { id: 'ING-006', name: 'Jollof rice (basmati)', unit: 'kg', cost: 8, supplier: 'Akosombo Fresh Market', stockOnHand: 48, par: 50, allergens: [] },
  { id: 'ING-007', name: 'Banku flour', unit: 'kg', cost: 8, supplier: 'Akosombo Fresh Market', stockOnHand: 12, par: 30, allergens: ['gluten'] },
  { id: 'ING-008', name: 'Tomato concassé', unit: 'kg', cost: 14, supplier: 'Akosombo Fresh Market', stockOnHand: 18, par: 20, allergens: [] },
  { id: 'ING-009', name: 'Black beans', unit: 'kg', cost: 18, supplier: 'Akosombo Fresh Market', stockOnHand: 22, par: 25, allergens: [] },
  { id: 'ING-010', name: 'Coconut (fresh)', unit: 'each', cost: 6, supplier: 'Akosombo Fresh Market', stockOnHand: 24, par: 30, allergens: [] },
  { id: 'ING-011', name: 'Hibiscus flowers (dried)', unit: 'kg', cost: 65, supplier: 'Akosombo Fresh Market', stockOnHand: 1.4, par: 3, allergens: [] },
  { id: 'ING-012', name: 'Palm oil', unit: 'L', cost: 22, supplier: 'Akosombo Fresh Market', stockOnHand: 8, par: 20, allergens: [] },
  { id: 'ING-013', name: 'Onions', unit: 'kg', cost: 6, supplier: 'Akosombo Fresh Market', stockOnHand: 18, par: 20, allergens: [] },
  { id: 'ING-014', name: 'Ginger', unit: 'kg', cost: 24, supplier: 'Akosombo Fresh Market', stockOnHand: 4, par: 5, allergens: [] },
  { id: 'ING-015', name: 'Shito (chili paste)', unit: 'kg', cost: 38, supplier: 'House-made (sub-recipe)', stockOnHand: 4, par: 6, allergens: [] },
  { id: 'ING-016', name: 'Lime', unit: 'each', cost: 1.5, supplier: 'Akosombo Fresh Market', stockOnHand: 80, par: 60, allergens: [] },
  { id: 'ING-017', name: 'Heavy cream', unit: 'L', cost: 32, supplier: 'Akosombo Fresh Market', stockOnHand: 4, par: 8, allergens: ['dairy'] },
  { id: 'ING-018', name: 'Eggs', unit: 'each', cost: 1.2, supplier: 'Akosombo Fresh Market', stockOnHand: 96, par: 120, allergens: ['eggs'] },
  { id: 'ING-019', name: 'Dark chocolate (70%)', unit: 'kg', cost: 95, supplier: 'Akosombo Fresh Market', stockOnHand: 1.8, par: 3, allergens: ['dairy'] },
  { id: 'ING-020', name: 'Peanuts (raw)', unit: 'kg', cost: 18, supplier: 'Akosombo Fresh Market', stockOnHand: 6, par: 8, allergens: ['nuts'] },
];

const RECIPES = [
  {
    id: 'REC-101', menuId: 'm20', name: 'Tilapia from the Lake', category: 'Mains · Lake', sellPrice: 170, yield: 1, station: 'Grill',
    bom: [
      { ing: 'ING-001', qty: 0.4, note: 'Whole tilapia, scaled' },
      { ing: 'ING-005', qty: 0.15, note: 'Sliced, fried' },
      { ing: 'ING-006', qty: 0.08, note: 'For jollof side' },
      { ing: 'ING-008', qty: 0.06 },
      { ing: 'ING-013', qty: 0.04 },
      { ing: 'ING-012', qty: 0.02 },
      { ing: 'ING-016', qty: 1, note: '1 lime, wedges' },
    ],
    prepTime: 18, allergens: ['fish'], signature: true,
    notes: 'Char-grill skin-side first. Serve with shito on side.',
  },
  {
    id: 'REC-102', menuId: 'm12', name: 'Volta Beef Striploin (250g)', category: 'Mains', sellPrice: 280, yield: 1, station: 'Grill',
    bom: [
      { ing: 'ING-002', qty: 0.25 },
      { ing: 'ING-005', qty: 0.1 },
      { ing: 'ING-013', qty: 0.05 },
      { ing: 'ING-012', qty: 0.02 },
      { ing: 'ING-017', qty: 0.05, note: 'For peppercorn jus' },
    ],
    prepTime: 14, allergens: ['dairy'],
    notes: 'Rest 4 min before plating. Cook to guest preference.',
  },
  {
    id: 'REC-103', menuId: 'm10', name: 'Jollof with Grilled Chicken', category: 'Mains', sellPrice: 160, yield: 1, station: 'Grill + Rice',
    bom: [
      { ing: 'ING-006', qty: 0.18 },
      { ing: 'ING-008', qty: 0.08 },
      { ing: 'ING-013', qty: 0.06 },
      { ing: 'ING-012', qty: 0.025 },
      { ing: 'ING-014', qty: 0.01 },
    ],
    prepTime: 22, allergens: [],
    notes: 'Half chicken (separate ingredient — track separately).',
  },
  {
    id: 'REC-104', menuId: 'm11', name: 'Banku & Tilapia', category: 'Mains · Ghanaian', sellPrice: 150, yield: 1, station: 'Grill + Pots',
    bom: [
      { ing: 'ING-001', qty: 0.35 },
      { ing: 'ING-007', qty: 0.18 },
      { ing: 'ING-015', qty: 0.04, note: 'Shito on side' },
    ],
    prepTime: 16, allergens: ['fish', 'gluten'],
  },
  {
    id: 'REC-105', menuId: 'm21', name: 'Lakeside Prawn Skewers', category: 'Mains · Lake', sellPrice: 220, yield: 1, station: 'Grill',
    bom: [
      { ing: 'ING-004', qty: 0.18 },
      { ing: 'ING-006', qty: 0.12 },
      { ing: 'ING-013', qty: 0.04 },
      { ing: 'ING-012', qty: 0.02 },
    ],
    prepTime: 12, allergens: ['shellfish'],
    notes: '3 skewers per cover. Marinate 20 min before service.',
  },
  {
    id: 'REC-106', menuId: 'm13', name: 'Vegetable Red Red', category: 'Mains · Vegetarian', sellPrice: 110, yield: 1, station: 'Pots',
    bom: [
      { ing: 'ING-009', qty: 0.18 },
      { ing: 'ING-005', qty: 0.12 },
      { ing: 'ING-012', qty: 0.03 },
      { ing: 'ING-013', qty: 0.05 },
      { ing: 'ING-008', qty: 0.04 },
    ],
    prepTime: 14, allergens: [],
    notes: 'Soaked beans overnight. Top with crispy plantain.',
  },
  {
    id: 'REC-107', menuId: 'm03', name: 'Akosombo Ceviche', category: 'Starters', sellPrice: 95, yield: 1, station: 'Cold',
    bom: [
      { ing: 'ING-001', qty: 0.12 },
      { ing: 'ING-016', qty: 2 },
      { ing: 'ING-011', qty: 0.005 },
      { ing: 'ING-013', qty: 0.02 },
    ],
    prepTime: 8, allergens: ['fish'],
  },
  {
    id: 'REC-108', menuId: 'm02', name: 'Kelewele', category: 'Starters', sellPrice: 48, yield: 1, station: 'Fryer',
    bom: [
      { ing: 'ING-005', qty: 0.18 },
      { ing: 'ING-014', qty: 0.005 },
      { ing: 'ING-012', qty: 0.05 },
      { ing: 'ING-020', qty: 0.04, note: 'Crushed for chutney' },
    ],
    prepTime: 10, allergens: ['nuts'],
  },
  {
    id: 'REC-109', menuId: 'm42', name: 'Chocolate Pot', category: 'Desserts', sellPrice: 72, yield: 1, station: 'Pastry',
    bom: [
      { ing: 'ING-019', qty: 0.06 },
      { ing: 'ING-017', qty: 0.08 },
      { ing: 'ING-018', qty: 1 },
    ],
    prepTime: 8, allergens: ['dairy'],
    notes: 'Pre-made in batches of 12 in morning. Dark choc 70%.',
  },
];

// Today's covers sold (theoretical baseline for variance calc)
const TODAY_COVERS = {
  'REC-101': 24, 'REC-102': 8, 'REC-103': 18, 'REC-104': 14,
  'REC-105': 6, 'REC-106': 10, 'REC-107': 12, 'REC-108': 16, 'REC-109': 9,
};

// Production sheet (par stock for pre-prep)
const PRODUCTION = [
  { item: 'Jollof rice base (mother stock)', station: 'Pots', par: 8, currentBatch: 5.5, unit: 'kg', priority: 'high', prepBy: '17:00' },
  { item: 'Shito (chili paste)', station: 'Cold', par: 4, currentBatch: 1.2, unit: 'kg', priority: 'high', prepBy: '17:00' },
  { item: 'Tilapia portions cleaned', station: 'Cold', par: 30, currentBatch: 18, unit: 'portions', priority: 'high', prepBy: '17:30' },
  { item: 'Beef striploin portioned', station: 'Cold', par: 15, currentBatch: 15, unit: 'portions', priority: 'normal', prepBy: '17:30' },
  { item: 'Plantain sliced & soaked', station: 'Prep', par: 12, currentBatch: 8, unit: 'kg', priority: 'normal', prepBy: '17:30' },
  { item: 'Chocolate pots (set)', station: 'Pastry', par: 12, currentBatch: 12, unit: 'units', priority: 'normal', prepBy: '15:00' },
  { item: 'Hibiscus reduction', station: 'Pastry', par: 1, currentBatch: 0.6, unit: 'L', priority: 'high', prepBy: '17:00' },
  { item: 'Lime wedges cut', station: 'Cold', par: 60, currentBatch: 40, unit: 'wedges', priority: 'normal', prepBy: '17:30' },
];

// Wastage log
const WASTAGE = [
  { id: 'W-0042', date: '24 Apr', ingredient: 'Lake fish (tilapia)', qty: 1.2, unit: 'kg', cost: 38, reason: 'Quality fail on receiving', loggedBy: 'Chef Olamide' },
  { id: 'W-0043', date: '24 Apr', ingredient: 'Coconut (fresh)', qty: 3, unit: 'each', cost: 18, reason: 'Spoilage', loggedBy: 'Sous (Ama backup)' },
  { id: 'W-0044', date: '23 Apr', ingredient: 'Heavy cream', qty: 0.5, unit: 'L', cost: 16, reason: 'Expired (over-ordered)', loggedBy: 'Yao Mensah' },
  { id: 'W-0045', date: '23 Apr', ingredient: 'Tomato concassé', qty: 0.8, unit: 'kg', cost: 11, reason: 'Mise-en-place over-prep', loggedBy: 'Chef Olamide' },
  { id: 'W-0046', date: '22 Apr', ingredient: 'Beef striploin', qty: 0.15, unit: 'kg', cost: 25, reason: 'Trim/fat (normal)', loggedBy: 'Chef Olamide' },
  { id: 'W-0047', date: '22 Apr', ingredient: 'Lake prawns', qty: 0.4, unit: 'kg', cost: 88, reason: 'Smelled off — supplier credit', loggedBy: 'Chef Olamide' },
];

// Stations on duty tonight
const STATIONS = [
  { name: 'Grill', lead: 'Chef Olamide Adeyemi', cooks: 1, status: 'on-duty', covers: 'High volume — Saturday' },
  { name: 'Cold (Garde Manger)', lead: 'TBD (Sous Chef vacancy)', cooks: 1, status: 'short-staffed', covers: 'Ama on maternity · backfill from Yao' },
  { name: 'Pots & Sauce', lead: 'Yao Mensah', cooks: 1, status: 'on-duty', covers: 'Doubling as pastry support' },
  { name: 'Pastry', lead: 'Yao Mensah (covering)', cooks: 0, status: 'gap', covers: 'Pre-prep done · plate at service only' },
  { name: 'Pass / Expediting', lead: 'Chef Olamide Adeyemi', cooks: 0, status: 'on-duty', covers: 'Chef expediting personally tonight' },
];

// ============================================================================
// HELPERS
// ============================================================================
const ingById = (id) => INGREDIENTS.find(i => i.id === id);
const recipeCost = (recipe) => recipe.bom.reduce((s, line) => {
  const ing = ingById(line.ing);
  return s + (ing ? ing.cost * line.qty : 0);
}, 0);
const recipeMargin = (recipe) => recipe.sellPrice - recipeCost(recipe);
const recipeCostPct = (recipe) => (recipeCost(recipe) / recipe.sellPrice) * 100;


// ============================================================================
// KITCHEN OVERVIEW
// ============================================================================
const KitchenOverview = ({ setActiveNav }) => {
  const totalRecipes = RECIPES.length;
  const avgCostPct = RECIPES.reduce((s, r) => s + recipeCostPct(r), 0) / RECIPES.length;
  const todayCovers = Object.values(TODAY_COVERS).reduce((s, v) => s + v, 0);
  const todayTheoreticalCost = RECIPES.reduce((s, r) => s + recipeCost(r) * (TODAY_COVERS[r.id] || 0), 0);
  const todayRevenue = RECIPES.reduce((s, r) => s + r.sellPrice * (TODAY_COVERS[r.id] || 0), 0);
  const todayCostPct = (todayTheoreticalCost / todayRevenue) * 100;
  const lowStockIngredients = INGREDIENTS.filter(i => i.stockOnHand / i.par < 0.4);
  const productionGap = PRODUCTION.filter(p => p.currentBatch < p.par);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Kitchen · Pre-Service</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Good afternoon, Chef</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Saturday dinner rush — service starts in 2h 15m</div>
          </div>
          <Btn variant="primary" icon={ClipboardList} onClick={() => setActiveNav('chef-production')}>Open Production Sheet</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Active Recipes" value={totalRecipes} sublabel="across all menus" icon={BookOpen} tone={theme.teal} />
          <KpiTile label="Avg Cost %" value={pct(avgCostPct)} sublabel="theoretical · all recipes" icon={Percent} tone={theme.gold} />
          <KpiTile label="Tonight's Forecast" value={`${todayCovers} covers`} sublabel={cedi(todayRevenue) + ' projected'} icon={Activity} tone={theme.dusk} />
          <KpiTile label="Tonight's Cost %" value={pct(todayCostPct)} sublabel={cedi(todayTheoreticalCost) + ' raw'} icon={DollarSign} tone={todayCostPct > 32 ? theme.clay : theme.leaf} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Production Sheet · Status" accent={theme.gold} action={<Btn variant="ghost" size="sm" icon={ArrowRight} onClick={() => setActiveNav('chef-production')}>Open</Btn>}>
            <div className="space-y-2">
              {PRODUCTION.slice(0, 5).map(p => {
                const ratio = p.currentBatch / p.par;
                const tone = ratio >= 1 ? 'leaf' : ratio >= 0.6 ? 'gold' : 'clay';
                return (
                  <div key={p.item} className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}`, borderLeft: `3px solid ${tone === 'leaf' ? theme.leaf : tone === 'gold' ? theme.gold : theme.clay}` }}>
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex-1">
                        <div className="text-sm" style={{ color: theme.ink, fontWeight: 500 }}>{p.item}</div>
                        <div className="text-xs" style={{ color: theme.inkSoft }}>{p.station} · prep by {p.prepBy}</div>
                      </div>
                      <Pill tone={tone} size="sm">{p.currentBatch}/{p.par} {p.unit}</Pill>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card title="Needs Attention" accent={theme.clay}>
            <div className="space-y-2">
              {productionGap.length > 0 && (
                <div className="p-3 flex items-start gap-3" style={{ background: theme.claySoft + '40', border: `1px solid ${theme.clay}30`, borderLeft: `3px solid ${theme.clay}` }}>
                  <AlertTriangle size={14} style={{ color: theme.clay, marginTop: 2 }} />
                  <div className="flex-1">
                    <div className="text-sm" style={{ color: theme.ink, fontWeight: 600 }}>{productionGap.length} production items behind</div>
                    <div className="text-xs mt-0.5" style={{ color: theme.inkSoft }}>Highest priority: jollof base, shito, hibiscus reduction</div>
                  </div>
                </div>
              )}
              {lowStockIngredients.length > 0 && (
                <div className="p-3 flex items-start gap-3" style={{ background: theme.goldSoft + '60', border: `1px solid ${theme.gold}30`, borderLeft: `3px solid ${theme.gold}` }}>
                  <Package size={14} style={{ color: theme.gold, marginTop: 2 }} />
                  <div className="flex-1">
                    <div className="text-sm" style={{ color: theme.ink, fontWeight: 600 }}>{lowStockIngredients.length} ingredients low on stock</div>
                    <div className="text-xs mt-0.5" style={{ color: theme.inkSoft }}>{lowStockIngredients.slice(0, 3).map(i => i.name).join(' · ')}</div>
                  </div>
                </div>
              )}
              <div className="p-3 flex items-start gap-3" style={{ background: theme.duskSoft + '60', border: `1px solid ${theme.dusk}30`, borderLeft: `3px solid ${theme.dusk}` }}>
                <Users size={14} style={{ color: theme.dusk, marginTop: 2 }} />
                <div className="flex-1">
                  <div className="text-sm" style={{ color: theme.ink, fontWeight: 600 }}>Sous Chef position still open</div>
                  <div className="text-xs mt-0.5" style={{ color: theme.inkSoft }}>Ama on maternity · 4 candidates shortlisted · interview Tue 28 Apr</div>
                </div>
              </div>
              <div className="p-3 flex items-start gap-3" style={{ background: theme.leafSoft + '40', border: `1px solid ${theme.leaf}30`, borderLeft: `3px solid ${theme.leaf}` }}>
                <CircleCheck size={14} style={{ color: theme.leaf, marginTop: 2 }} />
                <div className="flex-1">
                  <div className="text-sm" style={{ color: theme.ink, fontWeight: 600 }}>Direct-from-fisherman saving holding</div>
                  <div className="text-xs mt-0.5" style={{ color: theme.inkSoft }}>Coastal Seafoods route saving 8% vs market on tilapia</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card title="Tonight's Forecast · By Recipe" accent={theme.teal} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Recipe</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Forecast Covers</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Recipe Cost</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Sell Price</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Cost %</th>
                <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Tonight Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {RECIPES.map((r, i) => {
                const covers = TODAY_COVERS[r.id] || 0;
                const cost = recipeCost(r);
                const totalCost = cost * covers;
                const costPct = recipeCostPct(r);
                return (
                  <tr key={r.id} style={{ borderBottom: i < RECIPES.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2">
                        <span style={{ color: theme.ink, fontWeight: 500 }}>{r.name}</span>
                        {r.signature && <Pill tone="gold" size="sm"><Star size={9} /> Signature</Pill>}
                      </div>
                      <div className="text-[10px]" style={{ color: theme.inkMute }}>{r.category}</div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{covers}</td>
                    <td className="py-3 px-3 text-right font-mono text-xs" style={{ color: theme.inkSoft }}>{cedi(cost)}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.gold, fontWeight: 600 }}>{cedi(r.sellPrice)}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: costPct > 35 ? theme.clay : costPct > 30 ? theme.gold : theme.leaf, fontWeight: 600 }}>{pct(costPct)}</td>
                    <td className="py-3 px-5 text-right font-mono" style={{ color: theme.ink }}>{cedi(totalCost)}</td>
                  </tr>
                );
              })}
              <tr style={{ borderTop: `2px solid ${theme.ink}`, background: theme.bgPanelAlt }}>
                <td className="py-3 px-5 font-serif" style={{ color: theme.ink, fontWeight: 700 }}>Total · tonight</td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 700 }}>{todayCovers}</td>
                <td className="py-3 px-3"></td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: theme.gold, fontWeight: 700 }}>{cedi(todayRevenue)}</td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: todayCostPct > 32 ? theme.clay : theme.leaf, fontWeight: 700 }}>{pct(todayCostPct)}</td>
                <td className="py-3 px-5 text-right font-mono" style={{ color: theme.ink, fontWeight: 700 }}>{cedi(todayTheoreticalCost)}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// RECIPES & COST
// ============================================================================
const RecipesModule = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const categories = ['all', ...new Set(RECIPES.map(r => r.category.split(' · ')[0]))];
  const filtered = RECIPES.filter(r => filterCategory === 'all' || r.category.startsWith(filterCategory));

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Recipe Book</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Recipes & Cost</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{RECIPES.length} recipes · click any row for full BOM and cost breakdown</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Download}>Export Recipe Book</Btn>
            <Btn variant="primary" icon={Plus}>New Recipe</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="flex items-center gap-2 p-3 flex-wrap" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
          <span className="text-[10px] uppercase mr-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Category</span>
          {categories.map(c => (
            <button key={c} onClick={() => setFilterCategory(c)} className="text-xs px-3 py-1.5"
              style={{ background: filterCategory === c ? theme.ink : 'transparent', color: filterCategory === c ? theme.bgPanel : theme.inkSoft, border: `1px solid ${filterCategory === c ? theme.ink : theme.rule}`, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {c === 'all' ? 'All' : c}
            </button>
          ))}
          <div className="flex-1" />
          <span className="text-xs" style={{ color: theme.inkMute }}>{filtered.length} of {RECIPES.length}</span>
        </div>

        <Card title="Recipe Register" accent={theme.gold} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Recipe</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Station</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>BOM</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Cost</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Sell</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Margin</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Cost %</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Allergens</th>
                <th className="text-right py-3 px-5"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => {
                const cost = recipeCost(r);
                const costPct = recipeCostPct(r);
                const margin = recipeMargin(r);
                return (
                  <tr key={r.id} onClick={() => setSelectedRecipe(r)}
                    style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none', cursor: 'pointer' }}>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2">
                        <span style={{ color: theme.ink, fontWeight: 500 }}>{r.name}</span>
                        {r.signature && <Pill tone="gold" size="sm"><Star size={9} /> Signature</Pill>}
                      </div>
                      <div className="text-[10px]" style={{ color: theme.inkMute }}>{r.category}</div>
                    </td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{r.station}</td>
                    <td className="py-3 px-3 text-right font-mono text-xs" style={{ color: theme.inkSoft }}>{r.bom.length} ing.</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(cost)}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.gold, fontWeight: 600 }}>{cedi(r.sellPrice)}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.leaf, fontWeight: 500 }}>{cedi(margin)}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: costPct > 35 ? theme.clay : costPct > 30 ? theme.gold : theme.leaf, fontWeight: 600 }}>{pct(costPct)}</td>
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1">
                        {r.allergens.length === 0 && <span className="text-[10px]" style={{ color: theme.inkMute }}>—</span>}
                        {r.allergens.map(a => <Pill key={a} tone="clay" size="sm">{a}</Pill>)}
                      </div>
                    </td>
                    <td className="py-3 px-5 text-right"><ChevronRight size={14} style={{ color: theme.inkMute }} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Recipe detail drawer */}
      {selectedRecipe && <RecipeDrawer recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
    </div>
  );
};

const RecipeDrawer = ({ recipe, onClose }) => {
  const cost = recipeCost(recipe);
  const margin = recipeMargin(recipe);
  const costPct = recipeCostPct(recipe);
  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(21,32,31,0.4)' }} onClick={onClose}>
      <div className="w-[560px] h-full overflow-y-auto" style={{ background: theme.bgPanel, borderLeft: `1px solid ${theme.rule}` }} onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-5" style={{ background: theme.bgPanelAlt, borderBottom: `1px solid ${theme.rule}` }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-[10px] uppercase" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>{recipe.id}</div>
              <div className="font-serif mt-1" style={{ fontSize: '24px', color: theme.ink, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{recipe.name}</div>
              <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{recipe.category} · {recipe.station} · {recipe.prepTime} min prep</div>
            </div>
            <button onClick={onClose} className="p-1.5"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            <div className="p-2.5" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
              <div className="text-[10px] uppercase mb-0.5" style={{ color: theme.inkMute, letterSpacing: '0.12em' }}>Cost</div>
              <div className="font-mono text-base" style={{ color: theme.ink }}>{cedi(cost)}</div>
            </div>
            <div className="p-2.5" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
              <div className="text-[10px] uppercase mb-0.5" style={{ color: theme.inkMute, letterSpacing: '0.12em' }}>Sell</div>
              <div className="font-mono text-base" style={{ color: theme.gold, fontWeight: 600 }}>{cedi(recipe.sellPrice)}</div>
            </div>
            <div className="p-2.5" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
              <div className="text-[10px] uppercase mb-0.5" style={{ color: theme.inkMute, letterSpacing: '0.12em' }}>Margin</div>
              <div className="font-mono text-base" style={{ color: theme.leaf, fontWeight: 600 }}>{cedi(margin)}</div>
            </div>
            <div className="p-2.5" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
              <div className="text-[10px] uppercase mb-0.5" style={{ color: theme.inkMute, letterSpacing: '0.12em' }}>Cost %</div>
              <div className="font-mono text-base" style={{ color: costPct > 35 ? theme.clay : costPct > 30 ? theme.gold : theme.leaf, fontWeight: 600 }}>{pct(costPct)}</div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Bill of Materials</div>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}` }}>
                  <th className="text-left py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Ingredient</th>
                  <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Qty</th>
                  <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>@ Cost</th>
                  <th className="text-right py-2 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {recipe.bom.map((line, i) => {
                  const ing = ingById(line.ing);
                  if (!ing) return null;
                  return (
                    <tr key={i} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                      <td className="py-2.5">
                        <div style={{ color: theme.ink, fontWeight: 500 }}>{ing.name}</div>
                        {line.note && <div className="text-[10px] italic" style={{ color: theme.inkSoft }}>{line.note}</div>}
                        <div className="font-mono text-[10px]" style={{ color: theme.inkMute }}>{ing.id}</div>
                      </td>
                      <td className="py-2.5 text-right text-xs">
                        <div className="font-mono" style={{ color: theme.ink }}>{line.qty} {ing.unit}</div>
                      </td>
                      <td className="py-2.5 text-right text-xs font-mono" style={{ color: theme.inkSoft }}>{cedi(ing.cost)}/{ing.unit}</td>
                      <td className="py-2.5 text-right font-mono" style={{ color: theme.ink, fontWeight: 500 }}>{cedi(ing.cost * line.qty)}</td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop: `2px solid ${theme.ink}` }}>
                  <td className="py-2.5 font-serif" style={{ color: theme.ink, fontWeight: 600 }} colSpan={3}>Recipe cost</td>
                  <td className="py-2.5 text-right font-serif" style={{ color: theme.gold, fontSize: '17px' }}>{cedi(cost)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {recipe.allergens.length > 0 && (
            <div>
              <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Allergens</div>
              <div className="flex flex-wrap gap-1">
                {recipe.allergens.map(a => <Pill key={a} tone="clay">{a}</Pill>)}
              </div>
            </div>
          )}
          {recipe.notes && (
            <div>
              <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Chef Notes</div>
              <div className="p-3 text-sm italic" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}`, borderLeft: `3px solid ${theme.gold}`, color: theme.ink }}>{recipe.notes}</div>
            </div>
          )}
          <div className="space-y-2">
            <Btn variant="primary" icon={PenLine}>Edit Recipe</Btn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <Btn variant="secondary" size="md" icon={Printer}>Print Card</Btn>
              <Btn variant="ghost" size="md" icon={Download}>Export PDF</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// ============================================================================
// PRODUCTION SHEET
// ============================================================================
const ProductionModule = () => {
  const [production, setProduction] = useState(PRODUCTION);
  const updateBatch = (idx, delta) => {
    setProduction(prev => prev.map((p, i) => i === idx ? { ...p, currentBatch: Math.max(0, p.currentBatch + delta) } : p));
  };
  const stationGroups = production.reduce((acc, p) => {
    if (!acc[p.station]) acc[p.station] = [];
    acc[p.station].push(p);
    return acc;
  }, {});

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Mise-en-Place</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Production Sheet</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Saturday dinner · prep status by station · target full by 17:30</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Printer}>Print for Stations</Btn>
            <Btn variant="primary" icon={Check}>Mark All Complete</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Total Items" value={production.length} sublabel="prep tasks" icon={ClipboardList} />
          <KpiTile label="Complete" value={production.filter(p => p.currentBatch >= p.par).length} sublabel="at par" icon={CircleCheck} tone={theme.leaf} />
          <KpiTile label="In Progress" value={production.filter(p => p.currentBatch > 0 && p.currentBatch < p.par).length} sublabel="partial" icon={Clock3} tone={theme.gold} />
          <KpiTile label="Critical" value={production.filter(p => p.priority === 'high' && p.currentBatch < p.par).length} sublabel="high priority gap" icon={AlertTriangle} tone={theme.clay} />
        </div>

        {Object.entries(stationGroups).map(([station, items]) => (
          <Card key={station} title={`Station · ${station}`} accent={theme.teal} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Item</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Priority</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Par</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Current</th>
                  <th className="text-left py-3 px-8 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Progress</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>By</th>
                  <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Update</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => {
                  const idx = production.findIndex(x => x.item === p.item);
                  const ratio = p.currentBatch / p.par;
                  const barColor = ratio >= 1 ? theme.leaf : ratio >= 0.6 ? theme.gold : theme.clay;
                  return (
                    <tr key={p.item} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                      <td className="py-3 px-5" style={{ color: theme.ink, fontWeight: 500 }}>{p.item}</td>
                      <td className="py-3 px-3"><Pill tone={p.priority === 'high' ? 'clay' : 'neutral'} size="sm">{p.priority}</Pill></td>
                      <td className="py-3 px-3 text-right font-mono" style={{ color: theme.inkSoft }}>{p.par} {p.unit}</td>
                      <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{p.currentBatch}</td>
                      <td className="py-3 px-8" style={{ width: '20%' }}>
                        <div className="h-2 w-full overflow-hidden" style={{ background: theme.ruleSoft }}>
                          <div className="h-full" style={{ width: `${Math.min(ratio * 100, 100)}%`, background: barColor }} />
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-xs" style={{ color: theme.inkSoft }}>{p.prepBy}</td>
                      <td className="py-3 px-5 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button onClick={() => updateBatch(idx, -0.5)} className="w-6 h-6 flex items-center justify-center" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}><Minus size={11} /></button>
                          <button onClick={() => updateBatch(idx, 0.5)} className="w-6 h-6 flex items-center justify-center" style={{ background: theme.gold, color: '#FBF7EE', border: `1px solid ${theme.gold}` }}><Plus size={11} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// THEORETICAL VS ACTUAL VARIANCE
// ============================================================================
const VarianceModule = () => {
  // Mock: actual cost was 6% higher than theoretical due to wastage and yields
  const variances = RECIPES.map(r => {
    const covers = TODAY_COVERS[r.id] || 0;
    const theoretical = recipeCost(r) * covers;
    // Add some realistic variance — heavier on protein-heavy items
    const overrun = r.bom.some(b => ['ING-001','ING-002','ING-004'].includes(b.ing)) ? 1.10 : 1.04;
    const actual = theoretical * overrun * (0.95 + Math.random() * 0.15);
    const variance = actual - theoretical;
    const variancePct = theoretical > 0 ? (variance / theoretical) * 100 : 0;
    return { recipe: r, covers, theoretical, actual, variance, variancePct };
  }).filter(v => v.covers > 0);

  const totalTheoretical = variances.reduce((s, v) => s + v.theoretical, 0);
  const totalActual = variances.reduce((s, v) => s + v.actual, 0);
  const totalVariance = totalActual - totalTheoretical;
  const totalVariancePct = (totalVariance / totalTheoretical) * 100;

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Cost Control</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Theoretical vs Actual</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Daily food cost variance · MTD running 12% over budget</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Calendar}>Yesterday</Btn>
            <Btn variant="secondary" icon={Download}>Export</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Theoretical Cost" value={cedi(totalTheoretical)} sublabel="based on recipe BOMs" icon={BookOpen} tone={theme.teal} />
          <KpiTile label="Actual Cost" value={cedi(totalActual)} sublabel="from inventory issues" icon={Activity} tone={theme.dusk} />
          <KpiTile label="Variance" value={cedi(totalVariance)} sublabel={(totalVariance >= 0 ? 'over' : 'under') + ' theoretical'} icon={totalVariance >= 0 ? TrendingUp : TrendingDown} tone={totalVariance >= 0 ? theme.clay : theme.leaf} />
          <KpiTile label="Variance %" value={pct(totalVariancePct)} sublabel="target ≤ 4%" icon={Percent} tone={totalVariancePct > 4 ? theme.clay : theme.leaf} />
        </div>

        <div className="p-5 flex items-start gap-3" style={{ background: theme.claySoft + '40', border: `1px solid ${theme.clay}30`, borderLeft: `3px solid ${theme.clay}` }}>
          <AlertTriangle size={16} style={{ color: theme.clay, marginTop: 2 }} />
          <div className="flex-1">
            <div className="font-serif" style={{ fontSize: '17px', color: theme.ink, letterSpacing: '-0.01em' }}>Variance running above target</div>
            <p className="text-sm mt-1" style={{ color: theme.inkSoft }}>
              Protein-heavy items (Tilapia, Beef, Prawns) showing largest variance — likely yields lower than recipe spec.
              Suggest re-checking trim losses on the next beef delivery, and yield tests on the new tilapia supplier.
            </p>
          </div>
        </div>

        <Card title="Variance by Recipe · Tonight" accent={theme.dusk} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Recipe</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Covers</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Theoretical</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Actual</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Variance</th>
                <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Variance %</th>
              </tr>
            </thead>
            <tbody>
              {variances.sort((a, b) => b.variancePct - a.variancePct).map((v, i, arr) => (
                <tr key={v.recipe.id} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5" style={{ color: theme.ink, fontWeight: 500 }}>{v.recipe.name}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.inkSoft }}>{v.covers}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(v.theoretical)}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(v.actual)}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: v.variance >= 0 ? theme.clay : theme.leaf, fontWeight: 600 }}>{v.variance >= 0 ? '+' : ''}{cedi(v.variance)}</td>
                  <td className="py-3 px-5 text-right">
                    <Pill tone={v.variancePct > 8 ? 'clay' : v.variancePct > 4 ? 'gold' : 'leaf'} size="sm">
                      {v.variancePct >= 0 ? '+' : ''}{v.variancePct.toFixed(1)}%
                    </Pill>
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop: `2px solid ${theme.ink}`, background: theme.bgPanelAlt }}>
                <td className="py-3 px-5 font-serif" style={{ color: theme.ink, fontWeight: 700 }}>Total</td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 700 }}>{variances.reduce((s, v) => s + v.covers, 0)}</td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 700 }}>{cedi(totalTheoretical)}</td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 700 }}>{cedi(totalActual)}</td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: totalVariance >= 0 ? theme.clay : theme.leaf, fontWeight: 700 }}>{totalVariance >= 0 ? '+' : ''}{cedi(totalVariance)}</td>
                <td className="py-3 px-5 text-right">
                  <Pill tone={totalVariancePct > 8 ? 'clay' : totalVariancePct > 4 ? 'gold' : 'leaf'}>
                    {totalVariancePct >= 0 ? '+' : ''}{totalVariancePct.toFixed(1)}%
                  </Pill>
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// WASTAGE LOG
// ============================================================================
const WastageModule = () => {
  const totalWastageCost = WASTAGE.reduce((s, w) => s + w.cost, 0);
  const reasons = WASTAGE.reduce((acc, w) => {
    const key = w.reason.split('—')[0].split('(')[0].trim();
    if (!acc[key]) acc[key] = { count: 0, cost: 0 };
    acc[key].count += 1;
    acc[key].cost += w.cost;
    return acc;
  }, {});

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Quality Control</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Wastage Log</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Last 7 days · {cedi(totalWastageCost)} written off</div>
          </div>
          <Btn variant="primary" icon={Plus}>Log Wastage</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Total Items" value={WASTAGE.length} sublabel="last 7 days" icon={Trash2} />
          <KpiTile label="Total Cost" value={cedi(totalWastageCost)} sublabel="written off" icon={DollarSign} tone={theme.clay} />
          <KpiTile label="Avg per Day" value={cedi(Math.round(totalWastageCost / 7))} sublabel="rolling 7-day" icon={Activity} tone={theme.gold} />
          <KpiTile label="Supplier Credits" value={cedi(88 + 38)} sublabel="reclaimed" icon={CircleCheck} tone={theme.leaf} />
        </div>

        <Card title="Wastage Breakdown by Reason" accent={theme.gold}>
          <div className="space-y-3">
            {Object.entries(reasons).map(([reason, data]) => {
              const pctOfTotal = (data.cost / totalWastageCost) * 100;
              return (
                <div key={reason}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <div>
                      <span style={{ color: theme.ink, fontWeight: 500 }}>{reason}</span>
                      <span className="ml-2 text-xs" style={{ color: theme.inkMute }}>({data.count} item{data.count !== 1 ? 's' : ''})</span>
                    </div>
                    <span className="font-mono" style={{ color: theme.ink }}>{cedi(data.cost)}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden" style={{ background: theme.ruleSoft }}>
                    <div className="h-full" style={{ width: `${pctOfTotal}%`, background: theme.gold }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Recent Wastage Entries" accent={theme.clay} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Ref</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Date</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Ingredient</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Qty</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Cost</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Reason</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Logged By</th>
              </tr>
            </thead>
            <tbody>
              {WASTAGE.map((w, i) => (
                <tr key={w.id} style={{ borderBottom: i < WASTAGE.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5 font-mono text-xs" style={{ color: theme.inkSoft }}>{w.id}</td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{w.date}</td>
                  <td className="py-3 px-3" style={{ color: theme.ink, fontWeight: 500 }}>{w.ingredient}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{w.qty} {w.unit}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.clay, fontWeight: 600 }}>{cedi(w.cost)}</td>
                  <td className="py-3 px-3 text-xs italic" style={{ color: theme.inkSoft }}>{w.reason}</td>
                  <td className="py-3 px-5 text-xs" style={{ color: theme.inkSoft }}>{w.loggedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// STATIONS & TEAM
// ============================================================================
const StationsModule = () => (
  <div style={{ background: theme.bg, minHeight: '100%' }}>
    <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
      <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
        <div>
          <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Brigade · Tonight</div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Stations & Team</h1>
          <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Saturday dinner service · 6 cooks on duty (1 vacancy)</div>
        </div>
      </div>
    </div>

    <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiTile label="Stations Active" value={STATIONS.filter(s => s.status === 'on-duty').length} sublabel={`of ${STATIONS.length}`} icon={ChefHat} tone={theme.leaf} />
        <KpiTile label="Cooks on Duty" value={STATIONS.reduce((s, st) => s + st.cooks, 0)} sublabel="includes Chef" icon={Users} tone={theme.teal} />
        <KpiTile label="Coverage Gaps" value={STATIONS.filter(s => s.status !== 'on-duty').length} sublabel="being managed" icon={AlertCircle} tone={theme.gold} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {STATIONS.map(s => {
          const tone = s.status === 'on-duty' ? 'leaf' : s.status === 'short-staffed' ? 'gold' : 'clay';
          const accent = s.status === 'on-duty' ? theme.leaf : s.status === 'short-staffed' ? theme.gold : theme.clay;
          return (
            <div key={s.name} className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${accent}` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[10px] uppercase mb-1" style={{ color: theme.gold, letterSpacing: '0.16em', fontWeight: 700 }}>Station</div>
                  <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>{s.name}</div>
                </div>
                <Pill tone={tone}>{s.status}</Pill>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span style={{ color: theme.inkMute }}>Lead: </span>
                  <span style={{ color: theme.ink, fontWeight: 500 }}>{s.lead}</span>
                </div>
                <div>
                  <span style={{ color: theme.inkMute }}>Cooks on station: </span>
                  <span className="font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{s.cooks}</span>
                </div>
                <div className="text-xs italic" style={{ color: theme.inkSoft }}>{s.covers}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-5" style={{ background: theme.bgPanelAlt, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.dusk}` }}>
        <div className="flex items-start gap-3">
          <UserCircle size={18} style={{ color: theme.dusk, marginTop: 2 }} />
          <div className="flex-1">
            <div className="font-serif" style={{ fontSize: '17px', color: theme.ink, letterSpacing: '-0.01em' }}>Sous Chef recruitment underway</div>
            <p className="text-sm mt-1" style={{ color: theme.inkSoft }}>
              Ama Sarpong is on maternity leave through 8 June 2026. JOB-014 posted 8 April · 24 applicants ·
              4 shortlisted · interviews Tuesday 28 April. Until then, Yao Mensah is doubling pots/pastry and the
              Cold (Garde Manger) station needs Chef's daily attention.
            </p>
            <div className="mt-3 flex gap-2">
              <Btn variant="secondary" size="sm" icon={Eye}>View JOB-014 in HR</Btn>
              <Btn variant="ghost" size="sm" icon={CalendarDays}>Schedule interview</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// COMING SOON
// ============================================================================
const ChefComingSoon = ({ title }) => (
  <div className="p-4 md:p-6" style={{ background: theme.bg, minHeight: '100%' }}>
    <SectionHeader overline="Module" title={title} />
    <div className="p-12 text-center" style={{ background: theme.bgPanel, border: `1px dashed ${theme.rule}` }}>
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ background: theme.tealSoft, color: theme.teal }}><Sparkles size={20} /></div>
      <p className="font-serif text-lg mb-2" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Module defined in the BRD</p>
      <p className="text-sm" style={{ color: theme.inkSoft }}>To be built in the next sprint.</p>
    </div>
  </div>
);

// ============================================================================
// APP
// ============================================================================
const ChefApp = () => {
  const [activeNav, setActiveNav] = useState('chef-overview');
  let content;
  if (activeNav === 'chef-overview') content = <KitchenOverview setActiveNav={setActiveNav} />;
  else if (activeNav === 'chef-recipes') content = <RecipesModule />;
  else if (activeNav === 'chef-production') content = <ProductionModule />;
  else if (activeNav === 'chef-variance') content = <VarianceModule />;
  else if (activeNav === 'chef-wastage') content = <WastageModule />;
  else if (activeNav === 'chef-stations') content = <StationsModule />;
  else content = <ChefComingSoon title="Module" />;

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: theme.bg, fontFamily: '"Inter", system-ui, sans-serif', color: theme.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.rule}; }
      `}</style>
      <ChefSidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChefTopBar />
        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
};



// ============================================================================
// EXECUTIVE HOUSEKEEPER · Akua Mensah
// ============================================================================
const HK_NAV = [
  { id: 'rooms', label: 'Room Status', icon: Hotel },
  { id: 'hk-assignments', label: 'Assignments', icon: ClipboardList },
  { id: 'hk-minibar', label: 'Mini-Bar', icon: Wine },
  { id: 'hk-linen', label: 'Linen', icon: Bath },
  { id: 'hk-lostfound', label: 'Lost & Found', icon: Package },
];
// ============================================================================
// SIDEBAR — Executive Housekeeper
// ============================================================================
const HkSidebar = ({ activeNav, setActiveNav }) => (
  <aside className="hidden md:flex w-64 flex-shrink-0 flex-col" style={{ background: theme.navBg, color: '#FBF7EE' }}>
    <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <FloatLogo size="md" />
          <div className="text-[10px] mt-1" style={{ color: theme.gold, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Ghana</div>
        </div>
      </div>
    </div>
    <div className="px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium" style={{ background: theme.gold, color: theme.navBg, fontSize: '13px' }}>AK</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm" style={{ fontWeight: 500 }}>Akua Mensah</div>
          <div className="text-[10px]" style={{ color: theme.gold, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>Executive Housekeeper</div>
        </div>
      </div>
    </div>
    <nav className="flex-1 px-3 py-3 overflow-y-auto">
      {HK_NAV.map(item => {
        const Icon = item.icon;
        const active = activeNav === item.id;
        return (
          <button key={item.id} onClick={() => setActiveNav(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all text-sm"
            style={{ background: active ? 'rgba(185,135,64,0.15)' : 'transparent', color: active ? theme.gold : 'rgba(255,255,255,0.75)', borderLeft: active ? `3px solid ${theme.gold}` : '3px solid transparent', fontWeight: active ? 600 : 400 }}>
            <Icon size={15} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: theme.gold, color: theme.navBg, fontWeight: 700 }}>{item.badge}</span>}
          </button>
        );
      })}
    </nav>
    <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span>v1.0</span>
        <button className="hover:text-white"><LogOut size={12} /></button>
      </div>
    </div>
  </aside>
);

const HkTopBar = () => (
  <div className="flex items-center justify-between pl-16 pr-4 md:px-8 py-3 md:py-4" style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
    <div className="flex items-center gap-3 text-sm" style={{ color: theme.inkSoft }}>
      <Calendar size={14} /><span className="hidden md:inline">Saturday, 25 April 2026
    </span><span className="md:hidden">Sat 25 Apr</span></div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
        <Search size={13} style={{ color: theme.inkMute }} />
        <input placeholder="Search…" className="bg-transparent outline-none text-sm w-48" style={{ color: theme.ink }} />
      </div>
      <button className="relative p-2"><Bell size={15} style={{ color: theme.inkSoft }} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: theme.gold }} /></button>
    </div>
  </div>
);

// MOCK DATA
const ATTENDANTS = [
  { id: 'a1', name: 'Akua Mensah', initials: 'AK', credits: 16, productivity: 24 },
  { id: 'a2', name: 'Adwoa Boateng', initials: 'AB', credits: 14, productivity: 26 },
  { id: 'a3', name: 'Joseph Tetteh', initials: 'JT', credits: 12, productivity: 28 },
  { id: 'a4', name: 'Esi Owusu', initials: 'EO', credits: 10, productivity: 25 },
];

const ROOM_ASSIGNMENTS = {
  a1: ['101', '102', '103', '104', '203', '204', '205'],
  a2: ['105', '106', '107', '108', '206', '208', '209'],
  a3: ['109', '110', '111', '112', '210', '211', '212', '213'],
  a4: ['113', '201', '202', '214', '215', '301', '302', '303', '304'],
};

const MINIBAR_POSTINGS = [
  { id: 'MB-0890', room: '301', guest: 'Ines & Carlos Reyes', items: [{ name: 'Champagne split', qty: 1, price: 280 }, { name: 'Cashews', qty: 2, price: 65 }], total: 410, posted: false, attendant: 'Esi Owusu', time: '09:14' },
  { id: 'MB-0891', room: '212', guest: 'Hiroshi Yamada', items: [{ name: 'Sparkling water 500ml', qty: 2, price: 45 }, { name: 'Star Beer', qty: 1, price: 75 }], total: 165, posted: true, attendant: 'Joseph Tetteh', time: '08:42' },
  { id: 'MB-0892', room: '109', guest: 'Ndidi Okafor', items: [{ name: 'Red wine 187ml', qty: 1, price: 120 }], total: 120, posted: false, attendant: 'Joseph Tetteh', time: '09:32' },
  { id: 'MB-0893', room: '205', guest: 'Olivia Brown', items: [{ name: 'Chocolate truffles', qty: 1, price: 95 }], total: 95, posted: false, attendant: 'Akua Mensah', time: '09:48' },
  { id: 'MB-0894', room: '208', guest: 'Ezra Goldberg', items: [{ name: 'Coca-Cola 330ml', qty: 2, price: 35 }, { name: 'Pringles', qty: 1, price: 55 }], total: 125, posted: true, attendant: 'Adwoa Boateng', time: '08:14' },
  { id: 'MB-0895', room: '304', guest: 'David & Elena Stern', items: [{ name: 'Champagne split', qty: 1, price: 280 }, { name: 'Hibiscus chocolate', qty: 2, price: 85 }], total: 450, posted: false, attendant: 'Esi Owusu', time: '10:08' },
];

const LINEN_INVENTORY = [
  { item: 'Bath towels (large)', par: 200, current: 168, status: 'ok' },
  { item: 'Bath towels (medium)', par: 150, current: 142, status: 'ok' },
  { item: 'Hand towels', par: 200, current: 180, status: 'ok' },
  { item: 'Bathrobes', par: 64, current: 48, status: 'low' },
  { item: 'King duvet covers', par: 40, current: 38, status: 'ok' },
  { item: 'Queen duvet covers', par: 32, current: 22, status: 'low' },
  { item: 'Pillow cases', par: 200, current: 184, status: 'ok' },
  { item: 'Slippers (pairs)', par: 80, current: 14, status: 'critical' },
  { item: 'Pool towels', par: 100, current: 78, status: 'ok' },
  { item: 'Floor mats', par: 64, current: 56, status: 'ok' },
];

const LAUNDRY_CYCLES = [
  { date: '25 Apr', incoming: 142, outgoing: 138, lost: 0, replaced: 4 },
  { date: '24 Apr', incoming: 156, outgoing: 152, lost: 2, replaced: 2 },
  { date: '23 Apr', incoming: 138, outgoing: 138, lost: 0, replaced: 0 },
  { date: '22 Apr', incoming: 124, outgoing: 122, lost: 1, replaced: 1 },
  { date: '21 Apr', incoming: 168, outgoing: 164, lost: 0, replaced: 4 },
];

const LOST_FOUND_ITEMS = [
  { id: 'LF-0124', date: '24 Apr', item: 'Black silk scarf', location: 'Room 110', finder: 'Joseph Tetteh', status: 'held', photo: true, contact: '—', value: 'Mid' },
  { id: 'LF-0125', date: '24 Apr', item: 'Sony noise-cancelling headphones (WH-1000XM5)', location: 'Restaurant', finder: 'Yao Mensah', status: 'held', photo: true, contact: '—', value: 'High' },
  { id: 'LF-0123', date: '22 Apr', item: 'Reading glasses (gold frame)', location: 'Lakeside deck', finder: 'Ahmed Khoury (server)', status: 'returned', photo: true, contact: 'Mr. Whitaker', value: 'Mid' },
  { id: 'LF-0122', date: '20 Apr', item: 'Blue cashmere cardigan', location: 'Room 203', finder: 'Akua Mensah', status: 'held', photo: false, contact: '—', value: 'High' },
  { id: 'LF-0126', date: '24 Apr', item: 'Children\'s teddy bear (brown)', location: 'Pool deck', finder: 'Kofi Annan', status: 'held', photo: true, contact: '—', value: 'Sentimental' },
  { id: 'LF-0121', date: '18 Apr', item: 'iPhone charger (Apple, white)', location: 'Pool deck', finder: 'Sipho Dube', status: 'disposed', photo: false, contact: '—', value: 'Low' },
  { id: 'LF-0120', date: '15 Apr', item: 'Book — "Things Fall Apart" by Achebe', location: 'Room 301', finder: 'Esi Owusu', status: 'returned', photo: false, contact: 'Mrs. Sankara', value: 'Low' },
];


// MODULES
const HKAssignmentsModule = () => {
  const creditValue = (status, type) => {
    if (status === 'OD' || status === 'VD') return type.includes('Suite') ? 2 : 1;
    if (status === 'OC' || status === 'IN') return 0.5;
    return 0;
  };

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Housekeeping</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Daily Assignments</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Saturday, 25 April 2026 · 4 attendants on duty · balanced by room credits</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="ghost" icon={Calendar}>Tomorrow</Btn>
            <Btn variant="secondary" icon={Printer}>Print Sheets</Btn>
            <Btn variant="primary" icon={Send}>Notify Team</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="p-5" style={{ background: theme.goldSoft + '40', border: `1px solid ${theme.gold}30`, borderLeft: `3px solid ${theme.gold}` }}>
          <div className="flex items-start gap-3">
            <ClipboardList size={16} style={{ color: theme.gold, marginTop: 2 }} />
            <div className="text-sm" style={{ color: theme.inkSoft }}>
              <span className="font-serif" style={{ color: theme.ink }}>Credit system: </span>
              Dirty checkout = 1 credit (suite = 2). Occupied service = 0.5 credit. Daily target balanced per attendant by floor and credit count.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {ATTENDANTS.map(att => {
            const myRoomNumbers = ROOM_ASSIGNMENTS[att.id] || [];
            const myRooms = ROOMS.filter(r => myRoomNumbers.includes(r.number));
            const totalCredits = myRooms.reduce((s, r) => s + creditValue(r.status, r.type), 0);
            const dirtyToClean = myRooms.filter(r => r.status === 'VD' || r.status === 'OD').length;
            const balance = totalCredits / att.credits;
            const balanceColor = balance > 1.1 ? theme.clay : balance < 0.7 ? theme.gold : theme.leaf;
            return (
              <div key={att.id} className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.gold}` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-medium" style={{ background: theme.goldSoft, color: theme.gold, fontSize: '15px' }}>
                      {att.initials}
                    </div>
                    <div>
                      <div className="font-serif text-lg" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>{att.name}</div>
                      <div className="text-xs" style={{ color: theme.inkMute }}>{myRooms.length} rooms · {dirtyToClean} need cleaning</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-serif" style={{ fontSize: '28px', color: balanceColor, letterSpacing: '-0.02em' }}>{totalCredits.toFixed(1)}</div>
                    <div className="text-xs" style={{ color: theme.inkMute }}>of {att.credits} credits</div>
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden mb-4" style={{ background: theme.ruleSoft }}>
                  <div className="h-full" style={{ width: `${Math.min(balance * 100, 100)}%`, background: balanceColor }} />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {myRooms.map(r => {
                    const s = STATUSES[r.status];
                    return (
                      <span key={r.number} className="text-xs px-2 py-1 font-medium"
                        style={{ background: s.soft, color: s.ink, border: `1px solid ${s.color}30`, borderLeft: `2px solid ${s.color}` }}>
                        {r.number}
                      </span>
                    );
                  })}
                </div>
                <div className="mt-3 pt-3 flex items-center justify-between text-xs" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
                  <span style={{ color: theme.inkMute }}>Avg. min/room (last 7 days)</span>
                  <span style={{ color: theme.ink, fontWeight: 500 }}>{att.productivity} min</span>
                </div>
              </div>
            );
          })}
        </div>

        <Card title="Productivity · Last 7 Days" accent={theme.teal}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ATTENDANTS.map(att => (
              <div key={att.id} className="text-center p-4" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                <div className="text-xs" style={{ color: theme.inkMute }}>{att.name.split(' ')[0]}</div>
                <div className="font-serif my-2" style={{ fontSize: '32px', color: theme.ink, letterSpacing: '-0.02em' }}>{att.productivity}</div>
                <div className="text-xs" style={{ color: theme.inkSoft }}>avg. min/room</div>
                <div className="text-xs mt-2" style={{ color: theme.leaf }}>↑ 4% vs prev week</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// HK MINI-BAR
// ============================================================================
const HKMinibarModule = () => {
  const [postings, setPostings] = useState(MINIBAR_POSTINGS);
  const post = (id) => setPostings(p => p.map(x => x.id === id ? { ...x, posted: true } : x));
  const pending = postings.filter(p => !p.posted);
  const totalPending = pending.reduce((s, p) => s + p.total, 0);
  const totalPostedToday = postings.filter(p => p.posted).reduce((s, p) => s + p.total, 0);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Housekeeping · Revenue Capture</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Mini-Bar</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Postings reported by attendants · charge to guest folio</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Plus}>New Posting</Btn>
            <Btn variant="primary" icon={Check} disabled={pending.length === 0}>Post All to Folios</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiTile label="Pending Posting" value={pending.length} sublabel={cedi(totalPending) + ' value'} icon={AlertCircle} tone={theme.gold} />
          <KpiTile label="Posted Today" value={postings.filter(p => p.posted).length} sublabel={cedi(totalPostedToday) + ' charged to folios'} icon={CircleCheck} tone={theme.leaf} />
          <KpiTile label="Top Item · This Week" value="Sparkling Water" sublabel="34 units · ₵ 1,530" icon={Wine} tone={theme.teal} />
        </div>

        <Card title="Mini-Bar Postings" accent={theme.gold} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Reference</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Room · Guest</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Items</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Total</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Reported By</th>
                <th className="text-right py-3 px-5"></th>
              </tr>
            </thead>
            <tbody>
              {postings.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: i < postings.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none', opacity: p.posted ? 0.55 : 1 }}>
                  <td className="py-4 px-5">
                    <div className="font-mono text-xs" style={{ color: theme.inkSoft }}>{p.id}</div>
                    <div className="text-[10px]" style={{ color: theme.inkMute }}>{p.time}</div>
                  </td>
                  <td className="py-4 px-3">
                    <div style={{ color: theme.ink, fontWeight: 500 }}>Room {p.room}</div>
                    <div className="text-xs" style={{ color: theme.inkMute }}>{p.guest}</div>
                  </td>
                  <td className="py-4 px-3">
                    {p.items.map((it, j) => (
                      <div key={j} className="text-xs" style={{ color: theme.inkSoft }}>
                        {it.qty}× {it.name} <span style={{ color: theme.inkMute }}>(₵ {it.price})</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-4 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 500 }}>{cedi(p.total)}</td>
                  <td className="py-4 px-3 text-xs" style={{ color: theme.inkSoft }}>{p.attendant}</td>
                  <td className="py-4 px-5 text-right">
                    {p.posted
                      ? <Pill tone="leaf" size="sm"><Check size={9} /> Posted to folio</Pill>
                      : <Btn variant="primary" size="sm" onClick={() => post(p.id)}>Post to Folio</Btn>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// HK LINEN
// ============================================================================
const HKLinenModule = () => {
  const stats = {
    items: LINEN_INVENTORY.length,
    critical: LINEN_INVENTORY.filter(i => i.status === 'critical').length,
    low: LINEN_INVENTORY.filter(i => i.status === 'low').length,
    okPct: Math.round((LINEN_INVENTORY.filter(i => i.status === 'ok').length / LINEN_INVENTORY.length) * 100),
  };

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Housekeeping</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Linen & Supplies</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Last stock count: 22 April 2026 · Next: 29 April</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Calendar}>Last count: 22 Apr</Btn>
            <Btn variant="primary" icon={Plus}>New Stock Count</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Items Tracked" value={stats.items} sublabel="par-stocked categories" icon={Package} />
          <KpiTile label="Critical · Order Now" value={stats.critical} sublabel="below 25% par" icon={AlertTriangle} tone={theme.clay} />
          <KpiTile label="Low Stock" value={stats.low} sublabel="approaching reorder point" icon={AlertCircle} tone={theme.gold} />
          <KpiTile label="In Healthy Range" value={`${stats.okPct}%`} sublabel="of tracked items" icon={CircleCheck} tone={theme.leaf} />
        </div>

        <Card title="Linen & Supplies Inventory" accent={theme.teal} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Item</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Par Stock</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>On Hand</th>
                <th className="text-left py-3 px-8 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Stock Level</th>
                <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {LINEN_INVENTORY.map((item, i) => {
                const p = (item.current / item.par) * 100;
                const tone = item.status === 'critical' ? 'clay' : item.status === 'low' ? 'gold' : 'leaf';
                const barColor = item.status === 'critical' ? theme.clay : item.status === 'low' ? theme.gold : theme.leaf;
                return (
                  <tr key={i} style={{ borderBottom: i < LINEN_INVENTORY.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5" style={{ color: theme.ink }}>{item.item}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.inkSoft }}>{item.par}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{item.current}</td>
                    <td className="py-3 px-8 w-1/3">
                      <div className="h-2 w-full overflow-hidden" style={{ background: theme.ruleSoft }}>
                        <div className="h-full" style={{ width: `${p}%`, background: barColor }} />
                      </div>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <Pill tone={tone}>{item.status === 'critical' ? 'Order now' : item.status === 'low' ? 'Low' : 'OK'}</Pill>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <Card title="Laundry Cycles · Last 5 Days" accent={theme.gold} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Date</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Outgoing (dirty)</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Incoming (clean)</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Lost / Damaged</th>
                <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Replaced</th>
              </tr>
            </thead>
            <tbody>
              {LAUNDRY_CYCLES.map((c, i) => (
                <tr key={c.date} style={{ borderBottom: i < LAUNDRY_CYCLES.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5" style={{ color: theme.ink }}>{c.date}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.inkSoft }}>{c.outgoing}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{c.incoming}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: c.lost > 0 ? theme.clay : theme.inkMute }}>{c.lost}</td>
                  <td className="py-3 px-5 text-right font-mono" style={{ color: c.replaced > 0 ? theme.gold : theme.inkMute }}>{c.replaced}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// HK LOST & FOUND
// ============================================================================
const HKLostFoundModule = () => {
  const [filter, setFilter] = useState('all');
  const filtered = LOST_FOUND_ITEMS.filter(i => filter === 'all' || i.status === filter);
  const stats = {
    held: LOST_FOUND_ITEMS.filter(i => i.status === 'held').length,
    returned: LOST_FOUND_ITEMS.filter(i => i.status === 'returned').length,
    disposed: LOST_FOUND_ITEMS.filter(i => i.status === 'disposed').length,
    returnRate: Math.round((LOST_FOUND_ITEMS.filter(i => i.status === 'returned').length / LOST_FOUND_ITEMS.length) * 100),
  };

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Housekeeping</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Lost & Found</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Items found on property · 90-day holding period before disposal</div>
          </div>
          <Btn variant="primary" icon={Plus}>Log New Item</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Currently Held" value={stats.held} sublabel="awaiting collection" icon={Package} tone={theme.gold} />
          <KpiTile label="Returned" value={stats.returned} sublabel="last 30 days" icon={CircleCheck} tone={theme.leaf} />
          <KpiTile label="Disposed" value={stats.disposed} sublabel="after 90 days" icon={Trash2} tone={theme.inkMute} />
          <KpiTile label="Return Rate" value={`${stats.returnRate}%`} sublabel="of logged items" icon={Award} tone={theme.teal} />
        </div>

        <div className="flex items-center gap-3 p-3" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
          <span className="text-[10px] uppercase mr-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'held', label: 'Holding' },
            { id: 'returned', label: 'Returned' },
            { id: 'disposed', label: 'Disposed' },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} className="text-xs px-3 py-1.5"
              style={{
                background: filter === f.id ? theme.ink : 'transparent',
                color: filter === f.id ? theme.bgPanel : theme.inkSoft,
                border: `1px solid ${filter === f.id ? theme.ink : theme.rule}`,
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>{f.label}</button>
          ))}
          <div className="flex-1" />
          <span className="text-xs" style={{ color: theme.inkMute }}>{filtered.length} of {LOST_FOUND_ITEMS.length} items</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {filtered.map(item => {
            const tone = item.status === 'returned' ? 'leaf' : item.status === 'disposed' ? 'neutral' : 'gold';
            const color = item.status === 'returned' ? theme.leaf : item.status === 'disposed' ? theme.inkMute : theme.gold;
            const label = item.status === 'held' ? 'Holding' : item.status === 'returned' ? 'Returned' : 'Disposed';
            return (
              <div key={item.id} className="p-4 flex gap-3"
                style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${color}` }}>
                <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center" style={{ background: theme.bg, border: `1px dashed ${theme.rule}` }}>
                  {item.photo ? <Camera size={18} style={{ color: theme.inkMute }} /> : <Package size={18} style={{ color: theme.inkMute }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-mono text-xs" style={{ color: theme.inkSoft }}>{item.id}</div>
                    <Pill tone={tone} size="sm">{label}</Pill>
                  </div>
                  <div style={{ color: theme.ink, fontWeight: 500 }}>{item.item}</div>
                  <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>
                    <MapPin size={10} className="inline mr-1" />
                    {item.location} · {item.date} · Found by {item.finder}
                  </div>
                  {item.contact !== '—' && (
                    <div className="text-xs mt-1 italic" style={{ color: theme.leaf }}>
                      <Check size={10} className="inline mr-1" /> Returned to {item.contact}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MD ANNUAL BUDGET (once-a-year approval workflow)
// ============================================================================

const HkComingSoon = ({ title }) => (
  <div className="p-4 md:p-6" style={{ background: theme.bg, minHeight: '100%' }}>
    <SectionHeader overline="Module" title={title} />
    <div className="p-12 text-center" style={{ background: theme.bgPanel, border: `1px dashed ${theme.rule}` }}>
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ background: theme.tealSoft, color: theme.teal }}><Sparkles size={20} /></div>
      <p className="font-serif text-lg mb-2" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Module defined in the BRD</p>
      <p className="text-sm" style={{ color: theme.inkSoft }}>To be built in the next sprint.</p>
    </div>
  </div>
);

// ============================================================================
// APP
// ============================================================================
const HkApp = () => {
  const [activeNav, setActiveNav] = useState('rooms');
  let content;
  
  if (activeNav === 'rooms') content = <RoomStatusModule />;
  else if (activeNav === 'hk-assignments') content = <HKAssignmentsModule />;
  else if (activeNav === 'hk-minibar') content = <HKMinibarModule />;
  else if (activeNav === 'hk-linen') content = <HKLinenModule />;
  else if (activeNav === 'hk-lostfound') content = <HKLostFoundModule />;
  else content = <HkComingSoon title="Housekeeping" />;
  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: theme.bg, fontFamily: '"Inter", system-ui, sans-serif', color: theme.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.rule}; }
      `}</style>
      <HkSidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HkTopBar />
        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
};


// ============================================================================
// HR MANAGER · Aba Forson
// ============================================================================
const HR_NAV = [
  { id: 'hr-overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'hr-employees', label: 'Employees', icon: Users },
  { id: 'hr-attendance', label: 'Attendance & Leave', icon: CalendarDays },
  { id: 'hr-payroll', label: 'Payroll', icon: DollarSign },
  { id: 'hr-recruitment', label: 'Recruitment', icon: UserCircle },
];
// ============================================================================
// SIDEBAR — HR Manager
// ============================================================================
const HrSidebar = ({ activeNav, setActiveNav }) => (
  <aside className="hidden md:flex w-64 flex-shrink-0 flex-col" style={{ background: theme.navBg, color: '#FBF7EE' }}>
    <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <FloatLogo size="md" />
          <div className="text-[10px] mt-1" style={{ color: theme.gold, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Ghana</div>
        </div>
      </div>
    </div>
    <div className="px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium" style={{ background: theme.gold, color: theme.navBg, fontSize: '13px' }}>AF</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm" style={{ fontWeight: 500 }}>Aba Forson</div>
          <div className="text-[10px]" style={{ color: theme.gold, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>HR Manager</div>
        </div>
      </div>
    </div>
    <nav className="flex-1 px-3 py-3 overflow-y-auto">
      {HR_NAV.map(item => {
        const Icon = item.icon;
        const active = activeNav === item.id;
        return (
          <button key={item.id} onClick={() => setActiveNav(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all text-sm"
            style={{ background: active ? 'rgba(185,135,64,0.15)' : 'transparent', color: active ? theme.gold : 'rgba(255,255,255,0.75)', borderLeft: active ? `3px solid ${theme.gold}` : '3px solid transparent', fontWeight: active ? 600 : 400 }}>
            <Icon size={15} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: theme.gold, color: theme.navBg, fontWeight: 700 }}>{item.badge}</span>}
          </button>
        );
      })}
    </nav>
    <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span>v1.0</span>
        <button className="hover:text-white"><LogOut size={12} /></button>
      </div>
    </div>
  </aside>
);

const HrTopBar = () => (
  <div className="flex items-center justify-between pl-16 pr-4 md:px-8 py-3 md:py-4" style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
    <div className="flex items-center gap-3 text-sm" style={{ color: theme.inkSoft }}>
      <Calendar size={14} /><span className="hidden md:inline">Saturday, 25 April 2026
    </span><span className="md:hidden">Sat 25 Apr</span></div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
        <Search size={13} style={{ color: theme.inkMute }} />
        <input placeholder="Search…" className="bg-transparent outline-none text-sm w-48" style={{ color: theme.ink }} />
      </div>
      <button className="relative p-2"><Bell size={15} style={{ color: theme.inkSoft }} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: theme.gold }} /></button>
    </div>
  </div>
);

// MOCK DATA
const EMPLOYEES = [
  { id: 'EMP-001', name: 'Jana Kruger', role: 'General Manager', dept: 'Management', status: 'active', joined: '12 Mar 2022', salary: 18000, leave: { taken: 4, total: 21 }, contract: 'Permanent', email: 'jana.kruger@thefloat.com', phone: '+233 244 100 0001', nationality: 'South Africa' },
  { id: 'EMP-002', name: 'Amani Mlangeni', role: 'Front Office Manager', dept: 'Front Office', status: 'active', joined: '04 Jun 2022', salary: 8200, leave: { taken: 2, total: 18 }, contract: 'Permanent', email: 'amani@thefloat.com', phone: '+233 244 100 0002', nationality: 'South Africa' },
  { id: 'EMP-003', name: 'Yaa Owusu', role: 'F&B Manager', dept: 'F&B', status: 'active', joined: '15 Aug 2022', salary: 8400, leave: { taken: 5, total: 18 }, contract: 'Permanent', email: 'yaa.owusu@thefloat.com', phone: '+233 244 100 0003', nationality: 'Ghana' },
  { id: 'EMP-004', name: 'Akua Mensah', role: 'Executive Housekeeper', dept: 'Housekeeping', status: 'active', joined: '21 Apr 2022', salary: 6800, leave: { taken: 3, total: 18 }, contract: 'Permanent', email: 'akua.mensah@thefloat.com', phone: '+233 244 100 0004', nationality: 'Ghana' },
  { id: 'EMP-005', name: 'Aba Forson', role: 'HR Manager', dept: 'Management', status: 'active', joined: '10 Sep 2022', salary: 7800, leave: { taken: 1, total: 18 }, contract: 'Permanent', email: 'aba.forson@thefloat.com', phone: '+233 244 100 0005', nationality: 'Ghana' },
  { id: 'EMP-006', name: 'Adriaan van der Berg', role: 'Chief Accountant', dept: 'Finance', status: 'active', joined: '01 Jan 2023', salary: 9200, leave: { taken: 6, total: 18 }, contract: 'Permanent', email: 'adriaan@thefloat.com', phone: '+233 244 100 0006', nationality: 'South Africa' },
  { id: 'EMP-007', name: 'Chef Olamide Adeyemi', role: 'Executive Chef', dept: 'F&B', status: 'active', joined: '15 Feb 2023', salary: 8800, leave: { taken: 4, total: 18 }, contract: 'Permanent', email: 'olamide@thefloat.com', phone: '+233 244 100 0007', nationality: 'Nigeria' },
  { id: 'EMP-008', name: 'Sipho Dube', role: 'Maintenance Lead', dept: 'Maintenance', status: 'active', joined: '08 May 2022', salary: 5400, leave: { taken: 7, total: 18 }, contract: 'Permanent', email: 'sipho@thefloat.com', phone: '+233 244 100 0008', nationality: 'Zimbabwe' },
  { id: 'EMP-009', name: 'Adwoa Boateng', role: 'Room Attendant', dept: 'Housekeeping', status: 'active', joined: '20 Aug 2023', salary: 2400, leave: { taken: 0, total: 15 }, contract: 'Permanent', email: 'adwoa@thefloat.com', phone: '+233 244 100 0009', nationality: 'Ghana' },
  { id: 'EMP-010', name: 'Joseph Tetteh', role: 'Room Attendant', dept: 'Housekeeping', status: 'active', joined: '12 Sep 2023', salary: 2400, leave: { taken: 2, total: 15 }, contract: 'Permanent', email: 'joseph@thefloat.com', phone: '+233 244 100 0010', nationality: 'Ghana' },
  { id: 'EMP-011', name: 'Esi Owusu', role: 'Room Attendant', dept: 'Housekeeping', status: 'active', joined: '05 Oct 2023', salary: 2400, leave: { taken: 0, total: 15 }, contract: 'Permanent', email: 'esi@thefloat.com', phone: '+233 244 100 0011', nationality: 'Ghana' },
  { id: 'EMP-012', name: 'Kwame Asante', role: 'Front Desk Agent', dept: 'Front Office', status: 'active', joined: '14 Nov 2023', salary: 3200, leave: { taken: 1, total: 15 }, contract: 'Permanent', email: 'kwame@thefloat.com', phone: '+233 244 100 0012', nationality: 'Ghana' },
  { id: 'EMP-013', name: 'Yao Mensah', role: 'Restaurant Server', dept: 'F&B', status: 'active', joined: '21 Jan 2024', salary: 2800, leave: { taken: 0, total: 15 }, contract: 'Permanent', email: 'yao@thefloat.com', phone: '+233 244 100 0013', nationality: 'Ghana' },
  { id: 'EMP-014', name: 'Kofi Annan', role: 'Pool & Grounds Attendant', dept: 'Maintenance', status: 'active', joined: '04 Mar 2024', salary: 2200, leave: { taken: 0, total: 15 }, contract: 'Permanent', email: 'kofi@thefloat.com', phone: '+233 244 100 0014', nationality: 'Ghana' },
  { id: 'EMP-015', name: 'Ama Sarpong', role: 'Sous Chef', dept: 'F&B', status: 'on-leave', joined: '15 Apr 2023', salary: 5800, leave: { taken: 12, total: 18 }, contract: 'Permanent', email: 'ama@thefloat.com', phone: '+233 244 100 0015', nationality: 'Ghana', leaveType: 'Maternity', leaveReturn: '08 Jun 2026' },
  { id: 'EMP-016', name: 'Daniel Ofori', role: 'Spa Therapist', dept: 'Spa', status: 'probation', joined: '01 Mar 2026', salary: 3400, leave: { taken: 0, total: 15 }, contract: '6-month probation', email: 'daniel@thefloat.com', phone: '+233 244 100 0016', nationality: 'Ghana' },
];

const LEAVE_REQUESTS = [
  { id: 'LR-0124', employee: 'Joseph Tetteh', type: 'Annual', start: '02 May', end: '06 May', days: 5, status: 'pending', submitted: '24 Apr', reason: 'Family wedding in Kumasi' },
  { id: 'LR-0125', employee: 'Kwame Asante', type: 'Sick', start: '24 Apr', end: '24 Apr', days: 1, status: 'approved', submitted: '24 Apr', reason: 'Doctor appointment', approvedBy: 'Aba Forson' },
  { id: 'LR-0126', employee: 'Yao Mensah', type: 'Annual', start: '15 May', end: '22 May', days: 8, status: 'pending', submitted: '23 Apr', reason: 'Personal leave' },
  { id: 'LR-0127', employee: 'Adwoa Boateng', type: 'Compassionate', start: '12 May', end: '14 May', days: 3, status: 'approved', submitted: '21 Apr', reason: 'Family bereavement', approvedBy: 'Aba Forson' },
];

const PAYROLL_SUMMARY = {
  month: 'April 2026',
  status: 'pending-approval',
  totalGross: 102200,
  totalSSNIT: 5611, // 5.5% employee
  totalIncomeTax: 15240,
  totalNetPay: 81349,
  employerSSNIT: 13286, // 13% employer
  ssnitDue: '15 May 2026',
  payDate: '28 April 2026',
  bankFile: 'GHIPSS_Apr2026.csv',
};

const RECRUITMENT = [
  { id: 'JOB-014', position: 'Sous Chef', dept: 'F&B', stage: 'Interviewing', applicants: 24, shortlisted: 4, posted: '08 Apr 2026', urgency: 'high' },
  { id: 'JOB-015', position: 'Spa Therapist', dept: 'Spa', stage: 'Open', applicants: 18, shortlisted: 0, posted: '15 Apr 2026', urgency: 'normal' },
  { id: 'JOB-013', position: 'Front Desk Agent', dept: 'Front Office', stage: 'Offer extended', applicants: 31, shortlisted: 1, posted: '20 Mar 2026', urgency: 'normal' },
];


// MODULES
const HRModule = ({ activeNav }) => {
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [filterDept, setFilterDept] = useState('all');

  if (activeNav === 'hr-overview') {
    const total = EMPLOYEES.length;
    const onLeave = EMPLOYEES.filter(e => e.status === 'on-leave').length;
    const probation = EMPLOYEES.filter(e => e.status === 'probation').length;
    const monthlyPayroll = EMPLOYEES.reduce((s, e) => s + e.salary, 0);
    const byDept = EMPLOYEES.reduce((acc, e) => { acc[e.dept] = (acc[e.dept] || 0) + 1; return acc; }, {});
    const deptColors = { Management: theme.gold, 'Front Office': theme.teal, Housekeeping: theme.dusk, 'F&B': theme.hibiscus, Maintenance: theme.clay, Finance: theme.leaf, Spa: '#7A6B8F' };

    return (
      <div style={{ background: theme.bg, minHeight: '100%' }}>
        <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
          <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
            <div>
              <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>People & Payroll</div>
              <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>HR Overview</h1>
              <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Saturday, 25 April 2026 · {total} employees on roll</div>
            </div>
            <Btn variant="primary" icon={Plus}>Add Employee</Btn>
          </div>
        </div>

        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiTile label="Total Headcount" value={total} sublabel="across 7 departments" icon={Users} tone={theme.teal} />
            <KpiTile label="On Leave Today" value={onLeave} sublabel="1 maternity" icon={CalendarDays} tone={theme.dusk} />
            <KpiTile label="On Probation" value={probation} sublabel="under review" icon={Clock3} tone={theme.gold} />
            <KpiTile label="Monthly Payroll" value={cedi(monthlyPayroll)} sublabel="gross · before taxes" icon={DollarSign} tone={theme.gold} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Headcount by Department" accent={theme.teal}>
              <div className="space-y-3">
                {Object.entries(byDept).sort(([, a], [, b]) => b - a).map(([dept, count]) => {
                  const pct = (count / total) * 100;
                  return (
                    <div key={dept}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span style={{ color: theme.ink, fontWeight: 500 }}>{dept}</span>
                        <span className="font-mono" style={{ color: theme.inkSoft }}>{count}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden" style={{ background: theme.ruleSoft }}>
                        <div className="h-full" style={{ width: `${pct}%`, background: deptColors[dept] || theme.inkMute }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
            <Card title="Pending Actions" accent={theme.gold}>
              <div className="space-y-2">
                {[
                  { icon: CalendarDays, color: theme.gold, label: '2 leave requests pending', sub: 'Joseph Tetteh, Yao Mensah · review needed' },
                  { icon: DollarSign, color: theme.teal, label: 'April payroll awaiting approval', sub: cedi(81349) + ' net · pay date 28 Apr' },
                  { icon: UserCircle, color: theme.dusk, label: '3 open positions', sub: '1 high urgency (Sous Chef)' },
                  { icon: AlertCircle, color: theme.clay, label: 'Daniel Ofori probation review', sub: 'Due 01 Sep 2026 · 5 months ahead' },
                ].map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}`, borderLeft: `3px solid ${a.color}` }}>
                      <Icon size={14} style={{ color: a.color, marginTop: 2 }} />
                      <div className="flex-1">
                        <div className="text-sm" style={{ color: theme.ink, fontWeight: 500 }}>{a.label}</div>
                        <div className="text-xs mt-0.5" style={{ color: theme.inkSoft }}>{a.sub}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          <Card title="Recent Joiners & Leavers" accent={theme.dusk} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Employee</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Role</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Joined</th>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[...EMPLOYEES].sort((a, b) => new Date(b.joined) - new Date(a.joined)).slice(0, 5).map((e, i, arr) => (
                  <tr key={e.id} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5">
                      <div style={{ color: theme.ink, fontWeight: 500 }}>{e.name}</div>
                      <div className="text-[11px]" style={{ color: theme.inkMute }}>{e.dept}</div>
                    </td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{e.role}</td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{e.joined}</td>
                    <td className="py-3 px-5">
                      {e.status === 'probation' ? <Pill tone="gold" size="sm">Probation</Pill>
                        : e.status === 'on-leave' ? <Pill tone="dusk" size="sm">On Leave</Pill>
                        : <Pill tone="leaf" size="sm">Active</Pill>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    );
  }

  if (activeNav === 'hr-employees') {
    const filtered = EMPLOYEES.filter(e => filterDept === 'all' || e.dept === filterDept);
    const depts = ['all', ...new Set(EMPLOYEES.map(e => e.dept))];
    return (
      <div style={{ background: theme.bg, minHeight: '100%' }}>
        <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
          <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
            <div>
              <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>People</div>
              <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Employees</h1>
              <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{EMPLOYEES.length} on roll · click any row for full record</div>
            </div>
            <div className="flex items-center gap-2">
              <Btn variant="secondary" icon={Download}>Export</Btn>
              <Btn variant="primary" icon={Plus}>Add Employee</Btn>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="flex items-center gap-2 p-3 flex-wrap" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
            <span className="text-[10px] uppercase mr-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Department</span>
            {depts.map(d => (
              <button key={d} onClick={() => setFilterDept(d)} className="text-xs px-3 py-1.5"
                style={{
                  background: filterDept === d ? theme.ink : 'transparent',
                  color: filterDept === d ? theme.bgPanel : theme.inkSoft,
                  border: `1px solid ${filterDept === d ? theme.ink : theme.rule}`,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>{d === 'all' ? 'All' : d}</button>
            ))}
            <div className="flex-1" />
            <span className="text-xs" style={{ color: theme.inkMute }}>{filtered.length} of {EMPLOYEES.length}</span>
          </div>

          <Card title="Employee Roster" accent={theme.teal} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Employee</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Role · Dept</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Contract</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Salary (gross)</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Leave Balance</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
                  <th className="text-right py-3 px-5"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e, i) => {
                  const remaining = e.leave.total - e.leave.taken;
                  return (
                    <tr key={e.id} onClick={() => setSelectedEmp(e)}
                      style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none', cursor: 'pointer' }}>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: theme.tealSoft, color: theme.teal }}>
                            {e.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                          </div>
                          <div>
                            <div style={{ color: theme.ink, fontWeight: 500 }}>{e.name}</div>
                            <div className="text-[11px] font-mono" style={{ color: theme.inkMute }}>{e.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="text-sm" style={{ color: theme.ink }}>{e.role}</div>
                        <div className="text-[11px]" style={{ color: theme.inkMute }}>{e.dept}</div>
                      </td>
                      <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{e.contract}</td>
                      <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(e.salary)}</td>
                      <td className="py-3 px-3">
                        <div className="text-sm" style={{ color: theme.ink }}>{remaining} <span className="text-xs" style={{ color: theme.inkMute }}>of {e.leave.total} days</span></div>
                      </td>
                      <td className="py-3 px-3">
                        {e.status === 'on-leave' ? <Pill tone="dusk" size="sm">On Leave</Pill>
                          : e.status === 'probation' ? <Pill tone="gold" size="sm">Probation</Pill>
                          : <Pill tone="leaf" size="sm">Active</Pill>}
                      </td>
                      <td className="py-3 px-5 text-right"><ChevronRight size={14} style={{ color: theme.inkMute }} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>

        {selectedEmp && (
          <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(21,32,31,0.4)' }} onClick={() => setSelectedEmp(null)}>
            <div className="w-[480px] h-full overflow-y-auto" style={{ background: theme.bgPanel, borderLeft: `1px solid ${theme.rule}` }} onClick={(e) => e.stopPropagation()}>
              <div className="px-6 py-5" style={{ background: theme.bgPanelAlt, borderBottom: `1px solid ${theme.rule}` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center font-medium" style={{ background: theme.gold, color: theme.navBg, fontSize: '17px' }}>
                      {selectedEmp.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <div className="font-serif" style={{ fontSize: '22px', color: theme.ink, letterSpacing: '-0.01em' }}>{selectedEmp.name}</div>
                      <div className="text-sm" style={{ color: theme.inkSoft }}>{selectedEmp.role} · {selectedEmp.dept}</div>
                      <div className="font-mono text-[10px] mt-1" style={{ color: theme.inkMute }}>{selectedEmp.id}</div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedEmp(null)} className="p-1.5"><X size={18} /></button>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Contact</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm" style={{ color: theme.ink }}><Mail size={12} style={{ color: theme.inkMute }} />{selectedEmp.email}</div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: theme.ink }}><Phone size={12} style={{ color: theme.inkMute }} />{selectedEmp.phone}</div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: theme.ink }}><Globe size={12} style={{ color: theme.inkMute }} />{selectedEmp.nationality}</div>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase mb-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Employment</div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <InfoTile label="Joined" value={selectedEmp.joined} />
                    <InfoTile label="Contract" value={selectedEmp.contract} />
                    <InfoTile label="Salary (gross)" value={cedi(selectedEmp.salary)} />
                    <InfoTile label="Leave balance" value={`${selectedEmp.leave.total - selectedEmp.leave.taken} of ${selectedEmp.leave.total} days`} />
                  </div>
                </div>
                {selectedEmp.status === 'on-leave' && (
                  <div className="p-3" style={{ background: theme.duskSoft, border: `1px solid ${theme.dusk}30`, borderLeft: `3px solid ${theme.dusk}` }}>
                    <div className="text-[10px] uppercase mb-1" style={{ color: theme.dusk, letterSpacing: '0.14em', fontWeight: 700 }}>Currently on {selectedEmp.leaveType} Leave</div>
                    <div className="text-sm" style={{ color: theme.ink }}>Expected return: {selectedEmp.leaveReturn}</div>
                  </div>
                )}
                <div className="space-y-2">
                  <Btn variant="primary" icon={FileText}>Open Full Record</Btn>
                  <div className="flex gap-2">
                    <Btn variant="secondary" size="md" icon={Mail}>Message</Btn>
                    <Btn variant="ghost" size="md" icon={CalendarDays}>Schedule 1:1</Btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (activeNav === 'hr-attendance') {
    return (
      <div style={{ background: theme.bg, minHeight: '100%' }}>
        <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
          <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
            <div>
              <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Attendance · Leave</div>
              <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Attendance & Leave</h1>
              <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Today's attendance · open leave requests</div>
            </div>
            <Btn variant="primary" icon={Plus}>Log Leave</Btn>
          </div>
        </div>

        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiTile label="Clocked In Today" value={EMPLOYEES.filter(e => e.status === 'active').length} sublabel={`of ${EMPLOYEES.length} on roll`} icon={CheckCircle2} tone={theme.leaf} />
            <KpiTile label="On Leave" value={1} sublabel="Ama Sarpong · maternity" icon={CalendarDays} tone={theme.dusk} />
            <KpiTile label="Pending Leave Requests" value={LEAVE_REQUESTS.filter(l => l.status === 'pending').length} sublabel="awaiting approval" icon={Clock3} tone={theme.gold} />
            <KpiTile label="Late Arrivals · This Week" value={2} sublabel="auto-flagged" icon={AlertCircle} tone={theme.clay} />
          </div>

          <Card title="Pending Leave Requests" accent={theme.gold} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Reference</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Employee · Type</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Dates</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Days</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Reason</th>
                  <th className="text-right py-3 px-5"></th>
                </tr>
              </thead>
              <tbody>
                {LEAVE_REQUESTS.map((l, i) => (
                  <tr key={l.id} style={{ borderBottom: i < LEAVE_REQUESTS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none', opacity: l.status === 'approved' ? 0.55 : 1 }}>
                    <td className="py-3 px-5">
                      <div className="font-mono text-xs" style={{ color: theme.inkSoft }}>{l.id}</div>
                      <div className="text-[10px]" style={{ color: theme.inkMute }}>Submitted {l.submitted}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div style={{ color: theme.ink, fontWeight: 500 }}>{l.employee}</div>
                      <Pill tone={l.type === 'Sick' ? 'clay' : l.type === 'Compassionate' ? 'dusk' : 'teal'} size="sm">{l.type}</Pill>
                    </td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{l.start} → {l.end}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 500 }}>{l.days}</td>
                    <td className="py-3 px-3 text-xs italic" style={{ color: theme.inkSoft }}>{l.reason}</td>
                    <td className="py-3 px-5 text-right">
                      {l.status === 'pending'
                        ? <div className="flex justify-end gap-2">
                            <Btn variant="ghost" size="sm">Reject</Btn>
                            <Btn variant="primary" size="sm" icon={Check}>Approve</Btn>
                          </div>
                        : <Pill tone="leaf" size="sm"><Check size={9} /> Approved</Pill>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card title="Today's Attendance · 25 April 2026" accent={theme.teal} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Employee</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Department</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Clock In</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Clock Out</th>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Amani Mlangeni', dept: 'Front Office', in: '07:48', out: '—', status: 'present' },
                  { name: 'Kwame Asante', dept: 'Front Office', in: '08:12', out: '—', status: 'late' },
                  { name: 'Akua Mensah', dept: 'Housekeeping', in: '06:55', out: '—', status: 'present' },
                  { name: 'Adwoa Boateng', dept: 'Housekeeping', in: '07:02', out: '—', status: 'present' },
                  { name: 'Joseph Tetteh', dept: 'Housekeeping', in: '06:58', out: '—', status: 'present' },
                  { name: 'Esi Owusu', dept: 'Housekeeping', in: '07:05', out: '—', status: 'present' },
                  { name: 'Chef Olamide', dept: 'F&B', in: '07:30', out: '—', status: 'present' },
                  { name: 'Ama Sarpong', dept: 'F&B', in: '—', out: '—', status: 'on-leave' },
                ].map((a, i, arr) => (
                  <tr key={i} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5" style={{ color: theme.ink, fontWeight: 500 }}>{a.name}</td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{a.dept}</td>
                    <td className="py-3 px-3 font-mono text-xs" style={{ color: theme.ink }}>{a.in}</td>
                    <td className="py-3 px-3 font-mono text-xs" style={{ color: theme.inkMute }}>{a.out}</td>
                    <td className="py-3 px-5">
                      {a.status === 'late' ? <Pill tone="gold" size="sm">Late by 12 min</Pill>
                        : a.status === 'on-leave' ? <Pill tone="dusk" size="sm">On Leave</Pill>
                        : <Pill tone="leaf" size="sm"><Check size={9} /> Present</Pill>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    );
  }

  if (activeNav === 'hr-payroll') {
    return (
      <div style={{ background: theme.bg, minHeight: '100%' }}>
        <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
          <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
            <div>
              <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Payroll · {PAYROLL_SUMMARY.month}</div>
              <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Payroll</h1>
              <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Pay date: {PAYROLL_SUMMARY.payDate} · SSNIT due: {PAYROLL_SUMMARY.ssnitDue}</div>
            </div>
            <div className="flex items-center gap-2">
              <Btn variant="secondary" icon={Download}>Bank File</Btn>
              <Btn variant="primary" icon={Check}>Approve & Run Payroll</Btn>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="p-5 flex items-center gap-4" style={{ background: theme.goldSoft + '40', border: `1px solid ${theme.gold}30`, borderLeft: `3px solid ${theme.gold}` }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: theme.gold, color: '#FBF7EE' }}>
              <Clock size={24} />
            </div>
            <div className="flex-1">
              <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>April payroll awaiting approval</div>
              <div className="text-sm mt-0.5" style={{ color: theme.inkSoft }}>
                Once approved, the GHIPSS bank file will be generated and SSNIT/PAYE returns prepared for filing.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiTile label="Gross Pay" value={cedi(PAYROLL_SUMMARY.totalGross)} sublabel={`${EMPLOYEES.length} employees`} icon={DollarSign} />
            <KpiTile label="SSNIT (Employee 5.5%)" value={cedi(PAYROLL_SUMMARY.totalSSNIT)} sublabel="deducted" icon={ArrowDownRight} tone={theme.dusk} />
            <KpiTile label="Income Tax (PAYE)" value={cedi(PAYROLL_SUMMARY.totalIncomeTax)} sublabel="deducted" icon={ArrowDownRight} tone={theme.dusk} />
            <KpiTile label="Net Pay" value={cedi(PAYROLL_SUMMARY.totalNetPay)} sublabel="to be transferred" icon={DollarSign} tone={theme.gold} />
          </div>

          <Card title="Payroll Detail · April 2026" accent={theme.teal} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Employee</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Gross</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>SSNIT (5.5%)</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>PAYE</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Net Pay</th>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Method</th>
                </tr>
              </thead>
              <tbody>
                {EMPLOYEES.map((e, i) => {
                  const ssnit = Math.round(e.salary * 0.055);
                  const paye = Math.round(e.salary > 5000 ? e.salary * 0.20 : e.salary > 3000 ? e.salary * 0.15 : e.salary * 0.10);
                  const net = e.salary - ssnit - paye;
                  return (
                    <tr key={e.id} style={{ borderBottom: i < EMPLOYEES.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                      <td className="py-2.5 px-5">
                        <div style={{ color: theme.ink, fontWeight: 500 }}>{e.name}</div>
                        <div className="text-[11px]" style={{ color: theme.inkMute }}>{e.role}</div>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(e.salary)}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-xs" style={{ color: theme.inkSoft }}>({cedi(ssnit)})</td>
                      <td className="py-2.5 px-3 text-right font-mono text-xs" style={{ color: theme.inkSoft }}>({cedi(paye)})</td>
                      <td className="py-2.5 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{cedi(net)}</td>
                      <td className="py-2.5 px-5 text-xs" style={{ color: theme.inkSoft }}>GCB Bank</td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop: `2px solid ${theme.ink}`, background: theme.bgPanelAlt }}>
                  <td className="py-3 px-5 font-serif" style={{ color: theme.ink, fontWeight: 700, fontSize: '15px' }}>Total</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 700 }}>{cedi(PAYROLL_SUMMARY.totalGross)}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.dusk, fontWeight: 600 }}>({cedi(PAYROLL_SUMMARY.totalSSNIT)})</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.dusk, fontWeight: 600 }}>({cedi(PAYROLL_SUMMARY.totalIncomeTax)})</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.gold, fontWeight: 700, fontSize: '15px' }}>{cedi(PAYROLL_SUMMARY.totalNetPay)}</td>
                  <td className="py-3 px-5"></td>
                </tr>
              </tbody>
            </table>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.dusk}` }}>
              <div className="text-[10px] uppercase mb-2" style={{ color: theme.dusk, letterSpacing: '0.16em', fontWeight: 700 }}>Statutory Liabilities</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span style={{ color: theme.inkSoft }}>Employee SSNIT (5.5%)</span><span className="font-mono" style={{ color: theme.ink }}>{cedi(PAYROLL_SUMMARY.totalSSNIT)}</span></div>
                <div className="flex justify-between"><span style={{ color: theme.inkSoft }}>Employer SSNIT (13%)</span><span className="font-mono" style={{ color: theme.ink }}>{cedi(PAYROLL_SUMMARY.employerSSNIT)}</span></div>
                <div className="flex justify-between pt-2" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
                  <span className="font-serif" style={{ color: theme.ink, fontWeight: 600 }}>Total to SSNIT</span>
                  <span className="font-serif" style={{ color: theme.dusk, fontSize: '17px', fontWeight: 600 }}>{cedi(PAYROLL_SUMMARY.totalSSNIT + PAYROLL_SUMMARY.employerSSNIT)}</span>
                </div>
                <div className="flex justify-between"><span style={{ color: theme.inkSoft }}>PAYE to GRA</span><span className="font-mono" style={{ color: theme.ink }}>{cedi(PAYROLL_SUMMARY.totalIncomeTax)}</span></div>
              </div>
            </div>
            <div className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.leaf}` }}>
              <div className="text-[10px] uppercase mb-2" style={{ color: theme.leaf, letterSpacing: '0.16em', fontWeight: 700 }}>Bank File · GHIPSS</div>
              <div className="space-y-2 text-sm" style={{ color: theme.inkSoft }}>
                <div>Filename: <span className="font-mono" style={{ color: theme.ink }}>{PAYROLL_SUMMARY.bankFile}</span></div>
                <div>Bank: <span style={{ color: theme.ink }}>GCB Bank Limited</span></div>
                <div>Transactions: <span style={{ color: theme.ink }}>{EMPLOYEES.length}</span></div>
                <div>Total: <span className="font-mono" style={{ color: theme.gold, fontWeight: 600 }}>{cedi(PAYROLL_SUMMARY.totalNetPay)}</span></div>
              </div>
              <p className="text-xs mt-3" style={{ color: theme.inkMute }}>
                Generated automatically once payroll is approved. Upload to GCB Bank business portal for batch transfer.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeNav === 'hr-recruitment') {
    return (
      <div style={{ background: theme.bg, minHeight: '100%' }}>
        <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
          <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
            <div>
              <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Hiring Pipeline</div>
              <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Recruitment</h1>
              <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{RECRUITMENT.length} open positions · 73 active applicants</div>
            </div>
            <Btn variant="primary" icon={Plus}>Post New Position</Btn>
          </div>
        </div>

        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiTile label="Open Positions" value={RECRUITMENT.length} sublabel="actively recruiting" icon={UserCircle} tone={theme.teal} />
            <KpiTile label="Total Applicants" value={73} sublabel="across all roles" icon={Users} />
            <KpiTile label="In Interview Stage" value={4} sublabel="shortlisted" icon={Activity} tone={theme.gold} />
            <KpiTile label="Offer Extended" value={1} sublabel="awaiting acceptance" icon={Mail} tone={theme.leaf} />
          </div>

          <div className="space-y-3">
            {RECRUITMENT.map(r => {
              const stageTone = r.stage === 'Interviewing' ? 'gold' : r.stage === 'Offer extended' ? 'leaf' : 'teal';
              return (
                <div key={r.id} className="p-4 grid grid-cols-12 gap-4 items-center"
                  style={{
                    background: theme.bgPanel,
                    border: `1px solid ${theme.rule}`,
                    borderLeft: `3px solid ${r.urgency === 'high' ? theme.clay : theme.teal}`,
                  }}>
                  <div className="col-span-1 font-mono text-xs" style={{ color: theme.inkSoft }}>{r.id}</div>
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      <span className="font-serif" style={{ fontSize: '17px', color: theme.ink, letterSpacing: '-0.01em', fontWeight: 500 }}>{r.position}</span>
                      {r.urgency === 'high' && <Pill tone="clay" size="sm">High Urgency</Pill>}
                    </div>
                    <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>{r.dept} · Posted {r.posted}</div>
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="font-serif text-2xl" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>{r.applicants}</div>
                    <div className="text-[10px]" style={{ color: theme.inkMute }}>applicants</div>
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="font-serif text-2xl" style={{ color: theme.gold, letterSpacing: '-0.02em' }}>{r.shortlisted}</div>
                    <div className="text-[10px]" style={{ color: theme.inkMute }}>shortlisted</div>
                  </div>
                  <div className="col-span-2"><Pill tone={stageTone}>{r.stage}</Pill></div>
                  <div className="col-span-1 flex justify-end">
                    <Btn variant="secondary" size="sm" icon={Eye}>Open</Btn>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return <HrComingSoon title="HR module" />;
};

// ============================================================================
// PROCUREMENT & INVENTORY
// ============================================================================

const HrComingSoon = ({ title }) => (
  <div className="p-4 md:p-6" style={{ background: theme.bg, minHeight: '100%' }}>
    <SectionHeader overline="Module" title={title} />
    <div className="p-12 text-center" style={{ background: theme.bgPanel, border: `1px dashed ${theme.rule}` }}>
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ background: theme.tealSoft, color: theme.teal }}><Sparkles size={20} /></div>
      <p className="font-serif text-lg mb-2" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Module defined in the BRD</p>
      <p className="text-sm" style={{ color: theme.inkSoft }}>To be built in the next sprint.</p>
    </div>
  </div>
);

// ============================================================================
// APP
// ============================================================================
const HrApp = () => {
  const [activeNav, setActiveNav] = useState('hr-overview');
  let content;
  content = <HRModule activeNav={activeNav} />;
  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: theme.bg, fontFamily: '"Inter", system-ui, sans-serif', color: theme.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.rule}; }
      `}</style>
      <HrSidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HrTopBar />
        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
};


// ============================================================================
// CHIEF ACCOUNTANT · Adriaan van der Berg
// ============================================================================
const CA_NAV = [
  { id: 'ca-overview', label: 'Finance Overview', icon: LayoutDashboard },
  { id: 'ca-ledger', label: 'General Ledger', icon: BookOpen },
  { id: 'ca-statements', label: 'Trial Balance & P&L', icon: BarChart3 },
  { id: 'ca-ar', label: 'Accounts Receivable', icon: ArrowDownRight, badge: 6 },
  { id: 'ca-ap', label: 'Accounts Payable', icon: ArrowUpRight, badge: 4 },
  { id: 'ca-bank', label: 'Bank Reconciliation', icon: Building2 },
  { id: 'ca-jv', label: 'Journal Vouchers', icon: PenLine },
  { id: 'ca-tax', label: 'Tax Returns', icon: FileSignature },
  { id: 'ca-assets', label: 'Fixed Assets', icon: Briefcase },
];

const ca_ME = { initials: 'AB', name: 'Adriaan van der Berg', role: 'Chief Accountant' };

// ============================================================================
// SIDEBAR — Chief Accountant
// ============================================================================
const CaSidebar = ({ activeNav, setActiveNav }) => (
  <aside className="hidden md:flex w-64 flex-shrink-0 flex-col" style={{ background: theme.navBg, color: '#FBF7EE' }}>
    <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <FloatLogo size="md" />
          <div className="text-[10px] mt-1" style={{ color: theme.gold, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Ghana</div>
        </div>
      </div>
    </div>
    <div className="px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium" style={{ background: theme.gold, color: theme.navBg, fontSize: '13px' }}>{ca_ME.initials}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm" style={{ fontWeight: 500 }}>{ca_ME.name}</div>
          <div className="text-[10px]" style={{ color: theme.gold, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>{ca_ME.role}</div>
        </div>
      </div>
    </div>
    <nav className="flex-1 px-3 py-3 overflow-y-auto">
      {CA_NAV.map(item => {
        const Icon = item.icon;
        const active = activeNav === item.id;
        return (
          <button key={item.id} onClick={() => setActiveNav(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all text-sm"
            style={{ background: active ? 'rgba(185,135,64,0.15)' : 'transparent', color: active ? theme.gold : 'rgba(255,255,255,0.75)', borderLeft: active ? `3px solid ${theme.gold}` : '3px solid transparent', fontWeight: active ? 600 : 400 }}>
            <Icon size={15} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: theme.gold, color: theme.navBg, fontWeight: 700 }}>{item.badge}</span>}
          </button>
        );
      })}
    </nav>
    <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span>v1.0</span>
        <button className="hover:text-white"><LogOut size={12} /></button>
      </div>
    </div>
  </aside>
);

const CaTopBar = () => (
  <div className="flex items-center justify-between pl-16 pr-4 md:px-8 py-3 md:py-4" style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
    <div className="flex items-center gap-3 text-sm" style={{ color: theme.inkSoft }}>
      <Calendar size={14} /><span className="hidden md:inline">Saturday, 25 April 2026 · Period: April 2026 (open)
    </span><span className="md:hidden">Sat 25 Apr</span></div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
        <Search size={13} style={{ color: theme.inkMute }} />
        <input placeholder="Search GL accounts, transactions…" className="bg-transparent outline-none text-sm w-56" style={{ color: theme.ink }} />
      </div>
      <button className="relative p-2"><Bell size={15} style={{ color: theme.inkSoft }} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: theme.gold }} /></button>
    </div>
  </div>
);

// ============================================================================
// CA MOCK DATA
// ============================================================================
// Chart of Accounts — boutique hotel template (USALI-aligned, simplified)
const COA = [
  // Assets
  { code: '1100', name: 'Cash & Cash Equivalents', type: 'Asset', balance: 1842400, parent: null },
  { code: '1110', name: 'GCB Bank · Operating', type: 'Asset', balance: 1420000, parent: '1100' },
  { code: '1120', name: 'GCB Bank · USD Account', type: 'Asset', balance: 380400, parent: '1100' },
  { code: '1130', name: 'Cash on Hand · FO', type: 'Asset', balance: 18400, parent: '1100' },
  { code: '1140', name: 'Cash on Hand · F&B', type: 'Asset', balance: 23600, parent: '1100' },
  { code: '1200', name: 'Accounts Receivable', type: 'Asset', balance: 286400, parent: null },
  { code: '1210', name: 'AR · City Ledger', type: 'Asset', balance: 184200, parent: '1200' },
  { code: '1220', name: 'AR · Credit Cards (in transit)', type: 'Asset', balance: 102200, parent: '1200' },
  { code: '1300', name: 'Inventory', type: 'Asset', balance: 142800, parent: null },
  { code: '1310', name: 'Inventory · F&B', type: 'Asset', balance: 86400, parent: '1300' },
  { code: '1320', name: 'Inventory · HK Supplies', type: 'Asset', balance: 32400, parent: '1300' },
  { code: '1330', name: 'Inventory · Maintenance', type: 'Asset', balance: 24000, parent: '1300' },
  { code: '1500', name: 'Property, Plant & Equipment', type: 'Asset', balance: 18400000, parent: null },
  { code: '1510', name: 'Buildings', type: 'Asset', balance: 14200000, parent: '1500' },
  { code: '1520', name: 'Furniture & Fixtures', type: 'Asset', balance: 2800000, parent: '1500' },
  { code: '1530', name: 'Kitchen Equipment', type: 'Asset', balance: 980000, parent: '1500' },
  { code: '1540', name: 'IT & Office Equipment', type: 'Asset', balance: 420000, parent: '1500' },
  { code: '1590', name: 'Accumulated Depreciation', type: 'Asset', balance: -2840000, parent: '1500' },
  // Liabilities
  { code: '2100', name: 'Accounts Payable', type: 'Liability', balance: 184600, parent: null },
  { code: '2110', name: 'AP · Trade Suppliers', type: 'Liability', balance: 142400, parent: '2100' },
  { code: '2120', name: 'AP · OTA Commissions', type: 'Liability', balance: 42200, parent: '2100' },
  { code: '2200', name: 'Accrued Expenses', type: 'Liability', balance: 86400, parent: null },
  { code: '2300', name: 'Statutory Liabilities', type: 'Liability', balance: 38400, parent: null },
  { code: '2310', name: 'VAT + Tourism Levy Payable', type: 'Liability', balance: 24600, parent: '2300' },
  { code: '2320', name: 'PAYE Payable', type: 'Liability', balance: 15240, parent: '2300' },
  { code: '2330', name: 'SSNIT Payable', type: 'Liability', balance: 18897, parent: '2300' },
  { code: '2400', name: 'Guest Deposits Held', type: 'Liability', balance: 124800, parent: null },
  // Equity
  { code: '3100', name: "Owner's Capital", type: 'Equity', balance: 16000000, parent: null },
  { code: '3200', name: 'Retained Earnings', type: 'Equity', balance: 3580000, parent: null },
  // Revenue
  { code: '4100', name: 'Room Revenue', type: 'Revenue', balance: -2842000, parent: null }, // negative = credit balance
  { code: '4200', name: 'F&B Revenue', type: 'Revenue', balance: -892400, parent: null },
  { code: '4210', name: 'Restaurant Revenue', type: 'Revenue', balance: -624800, parent: '4200' },
  { code: '4220', name: 'Bar Revenue', type: 'Revenue', balance: -184200, parent: '4200' },
  { code: '4230', name: 'Banquet Revenue', type: 'Revenue', balance: -83400, parent: '4200' },
  { code: '4300', name: 'Other Revenue', type: 'Revenue', balance: -184400, parent: null },
  // Expenses
  { code: '5100', name: 'Cost of Sales · F&B', type: 'Expense', balance: 312840, parent: null },
  { code: '5200', name: 'Salaries & Wages', type: 'Expense', balance: 408000, parent: null },
  { code: '5300', name: 'Utilities', type: 'Expense', balance: 124800, parent: null },
  { code: '5400', name: 'Maintenance & Repairs', type: 'Expense', balance: 86400, parent: null },
  { code: '5500', name: 'Marketing & Distribution', type: 'Expense', balance: 142000, parent: null },
  { code: '5600', name: 'Administrative & General', type: 'Expense', balance: 184200, parent: null },
  { code: '5700', name: 'Depreciation', type: 'Expense', balance: 142000, parent: null },
];

// AR — City Ledger
const AR_LEDGER = [
  { id: 'AR-2026-0142', client: 'TechAfrica Ltd', invoiceDate: '12 Apr 2026', dueDate: '12 May 2026', amount: 48400, balance: 48400, ageBucket: 'current', notes: '4-room corporate stay · 8-12 Apr' },
  { id: 'AR-2026-0138', client: 'Volta Energy Authority', invoiceDate: '03 Apr 2026', dueDate: '03 May 2026', amount: 32800, balance: 32800, ageBucket: 'current', notes: 'Q1 board offsite' },
  { id: 'AR-2026-0124', client: 'GH Diamond Tours', invoiceDate: '20 Mar 2026', dueDate: '19 Apr 2026', amount: 24400, balance: 24400, ageBucket: '1-30', notes: 'Group of 8 · Easter weekend' },
  { id: 'AR-2026-0118', client: 'IFC West Africa', invoiceDate: '14 Mar 2026', dueDate: '13 Apr 2026', amount: 38400, balance: 38400, ageBucket: '1-30', notes: 'Conference accommodation' },
  { id: 'AR-2026-0102', client: 'Booking.com Commission', invoiceDate: '28 Feb 2026', dueDate: '30 Mar 2026', amount: 22200, balance: 22200, ageBucket: '31-60', notes: 'February OTA commissions due to us · disputed line' },
  { id: 'AR-2026-0094', client: 'Sunset Adventures', invoiceDate: '04 Feb 2026', dueDate: '06 Mar 2026', amount: 18000, balance: 18000, ageBucket: '60+', notes: 'Late · 2nd dunning letter sent 10 Apr' },
];

// AP — vendor invoices
const AP_INVOICES = [
  { id: 'AP-2026-0218', vendor: 'Akosombo Fresh Market', invoiceDate: '22 Apr 2026', dueDate: '06 May 2026', amount: 18600, status: '3-way-matched', poRef: 'PO-1138', grnRef: 'GRN-2026-0142', notes: 'Daily produce · week 17' },
  { id: 'AP-2026-0217', vendor: 'Volta Vintners', invoiceDate: '22 Apr 2026', dueDate: '22 May 2026', amount: 18400, status: '3-way-matched', poRef: 'PO-1135', grnRef: 'GRN-2026-0141', notes: 'Q2 wine restock' },
  { id: 'AP-2026-0216', vendor: 'Volta Cooling Ltd', invoiceDate: '20 Apr 2026', dueDate: '20 May 2026', amount: 4800, status: 'awaiting-grn', poRef: 'PO-1130', grnRef: null, notes: 'Quarterly chiller service · GRN pending sign-off' },
  { id: 'AP-2026-0215', vendor: 'ECG · Volta Region', invoiceDate: '15 Apr 2026', dueDate: '30 Apr 2026', amount: 32400, status: 'no-po', poRef: null, grnRef: null, notes: 'March electricity · utility · no PO required' },
  { id: 'AP-2026-0214', vendor: 'Booking.com', invoiceDate: '12 Apr 2026', dueDate: '12 May 2026', amount: 42200, status: '3-way-matched', poRef: 'CONTRACT', grnRef: null, notes: 'OTA commission · March stays · contracted rate' },
  { id: 'AP-2026-0213', vendor: 'Tema Linen Supply', invoiceDate: '08 Apr 2026', dueDate: '22 Apr 2026', amount: 8400, status: 'overdue', poRef: 'PO-1128', grnRef: 'GRN-2026-0138', notes: 'Linen · payment overdue 3 days' },
];

// Bank statements / reconciliation
const BANK_ACCOUNTS = [
  { id: 'GCB-OPS', name: 'GCB Bank · Operating', currency: 'GHS', statementBalance: 1428200, glBalance: 1420000, lastImport: '24 Apr 2026', unmatched: 4 },
  { id: 'GCB-USD', name: 'GCB Bank · USD Account', currency: 'USD', statementBalance: 28400, glBalance: 28000, lastImport: '24 Apr 2026', unmatched: 1 },
];

const UNMATCHED_BANK_ITEMS = [
  { id: 'B-4421', date: '24 Apr', description: 'INWARD TRF · IFC WEST AFRICA', amount: 38400, type: 'credit', suggestedMatch: 'AR-2026-0118' },
  { id: 'B-4420', date: '23 Apr', description: 'CARD STMT SETTLEMENT · STANBIC', amount: 184200, type: 'credit', suggestedMatch: 'GL · 1220' },
  { id: 'B-4419', date: '22 Apr', description: 'BANK CHARGES · APR FEES', amount: -1240, type: 'debit', suggestedMatch: 'GL · 5600' },
  { id: 'B-4418', date: '21 Apr', description: 'EFT · ECG VOLTA REGION', amount: -32400, type: 'debit', suggestedMatch: 'AP-2026-0215' },
];

// Journal vouchers
const JOURNAL_VOUCHERS = [
  { id: 'JV-2026-0084', date: '25 Apr 2026', description: 'Daily revenue posting · 24 Apr 2026', preparedBy: 'System (Night Audit)', status: 'posted', total: 187500 },
  { id: 'JV-2026-0083', date: '25 Apr 2026', description: 'Cashier shift close · 24 Apr 2026', preparedBy: 'System (Night Audit)', status: 'posted', total: 64200 },
  { id: 'JV-2026-0082', date: '23 Apr 2026', description: 'Monthly accruals · April', preparedBy: 'Adriaan van der Berg', status: 'posted', total: 86400 },
  { id: 'JV-2026-0081', date: '22 Apr 2026', description: 'FX revaluation · USD account', preparedBy: 'Adriaan van der Berg', status: 'pending-approval', total: 8400, notes: 'Awaiting GM approval per FX policy' },
  { id: 'JV-2026-0080', date: '20 Apr 2026', description: 'Reclassify maintenance to capex · Pool pump', preparedBy: 'Adriaan van der Berg', status: 'draft', total: 5800 },
];

// Tax returns
const TAX_PERIODS = [
  { period: 'April 2026', vat: 124800, tourism: 24600, paye: 15240, ssnit: 24508, status: 'draft', dueDate: '15 May 2026' },
  { period: 'March 2026', vat: 118400, tourism: 23200, paye: 14800, ssnit: 23900, status: 'filed', dueDate: '15 Apr 2026', filedOn: '12 Apr 2026' },
  { period: 'February 2026', vat: 102000, tourism: 19800, paye: 14200, ssnit: 22400, status: 'filed', dueDate: '15 Mar 2026', filedOn: '11 Mar 2026' },
];

// Fixed assets
const FIXED_ASSETS = [
  { id: 'FA-001', name: 'Main Building', category: 'Buildings', acquired: '01 Mar 2022', cost: 12400000, deprMethod: 'Straight-line · 40yr', accumDepr: 1240000, nbv: 11160000 },
  { id: 'FA-002', name: 'Lakeside Pavilion', category: 'Buildings', acquired: '15 Jun 2022', cost: 1800000, deprMethod: 'Straight-line · 40yr', accumDepr: 168750, nbv: 1631250 },
  { id: 'FA-003', name: 'Commercial Kitchen Suite', category: 'Kitchen Equipment', acquired: '20 Apr 2022', cost: 480000, deprMethod: 'Straight-line · 10yr', accumDepr: 192000, nbv: 288000 },
  { id: 'FA-004', name: 'Restaurant Furniture (full set)', category: 'Furniture & Fixtures', acquired: '10 May 2022', cost: 280000, deprMethod: 'Straight-line · 7yr', accumDepr: 156000, nbv: 124000 },
  { id: 'FA-005', name: 'Generator · 250kVA Cummins', category: 'Plant', acquired: '15 Mar 2022', cost: 380000, deprMethod: 'Straight-line · 15yr', accumDepr: 102666, nbv: 277334 },
  { id: 'FA-006', name: 'Pool & Filtration System', category: 'Plant', acquired: '01 Mar 2022', cost: 240000, deprMethod: 'Straight-line · 15yr', accumDepr: 67200, nbv: 172800 },
  { id: 'FA-007', name: 'POS Hardware (8 stations)', category: 'IT Equipment', acquired: '08 Mar 2023', cost: 84000, deprMethod: 'Straight-line · 4yr', accumDepr: 44100, nbv: 39900 },
  { id: 'FA-008', name: 'Solar PV System · 60kW', category: 'Plant', acquired: '12 Sep 2024', cost: 580000, deprMethod: 'Straight-line · 20yr', accumDepr: 47208, nbv: 532792 },
];

const fmtNeg = (n) => n < 0 ? `(${cedi(Math.abs(n))})` : cedi(n);
const ageBucketLabel = (b) => ({ current: 'Current', '1-30': '1–30 days', '31-60': '31–60 days', '60+': '60+ days' }[b] || b);


// ============================================================================
// FINANCE OVERVIEW
// ============================================================================
const FinanceOverview = ({ setActiveNav }) => {
  const totalCash = COA.find(a => a.code === '1100').balance;
  const totalAR = COA.find(a => a.code === '1200').balance;
  const totalAP = COA.find(a => a.code === '2100').balance;
  const taxLiability = COA.find(a => a.code === '2300').balance;
  const totalRevenueMTD = -(COA.find(a => a.code === '4100').balance + COA.find(a => a.code === '4200').balance + COA.find(a => a.code === '4300').balance);
  const totalExpensesMTD = COA.filter(a => a.code.startsWith('5')).reduce((s, a) => s + a.balance, 0);
  const grossProfitMTD = totalRevenueMTD - totalExpensesMTD;

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Finance · April 2026</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Good morning, Adriaan</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>April period open · 5 days to month-end · April returns due 15 May</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Download}>Export Period</Btn>
            <Btn variant="primary" icon={ArrowRight} onClick={() => setActiveNav('ca-statements')}>Open Trial Balance</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Cash Position" value={cedi(totalCash)} sublabel="across all bank accounts" icon={Building2} tone={theme.gold} />
          <KpiTile label="MTD Revenue" value={cedi(totalRevenueMTD)} sublabel="rooms + F&B + other" icon={TrendingUp} tone={theme.leaf} />
          <KpiTile label="MTD Gross Profit" value={cedi(grossProfitMTD)} sublabel={`${pct(grossProfitMTD / totalRevenueMTD * 100)} margin`} icon={Activity} tone={theme.teal} />
          <KpiTile label="Tax Liability" value={cedi(taxLiability)} sublabel="VAT + PAYE + SSNIT" icon={FileSignature} tone={theme.dusk} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Working Capital" accent={theme.teal}>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                <div>
                  <div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Receivables</div>
                  <div className="font-serif text-2xl mt-1" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>{cedi(totalAR)}</div>
                  <button className="text-[11px] mt-1 underline" style={{ color: theme.gold }} onClick={() => setActiveNav('ca-ar')}>View ageing →</button>
                </div>
                <ArrowDownRight size={20} style={{ color: theme.leaf }} />
              </div>
              <div className="flex items-center justify-between p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                <div>
                  <div className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Payables</div>
                  <div className="font-serif text-2xl mt-1" style={{ color: theme.ink, letterSpacing: '-0.02em' }}>{cedi(totalAP)}</div>
                  <button className="text-[11px] mt-1 underline" style={{ color: theme.gold }} onClick={() => setActiveNav('ca-ap')}>View ageing →</button>
                </div>
                <ArrowUpRight size={20} style={{ color: theme.clay }} />
              </div>
              <div className="flex items-center justify-between p-3" style={{ background: theme.goldSoft + '40', border: `1px solid ${theme.gold}30`, borderLeft: `3px solid ${theme.gold}` }}>
                <div>
                  <div className="text-[10px] uppercase" style={{ color: theme.gold, letterSpacing: '0.14em', fontWeight: 700 }}>Net Working Capital</div>
                  <div className="font-serif text-2xl mt-1" style={{ color: theme.gold, letterSpacing: '-0.02em', fontWeight: 600 }}>{cedi(totalAR - totalAP)}</div>
                  <div className="text-[11px] mt-1" style={{ color: theme.inkSoft }}>AR − AP balance</div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Period-End Checklist" accent={theme.gold}>
            <div className="space-y-2">
              {[
                { task: 'Daily revenue postings up-to-date', done: true, ref: '24 Apr posted' },
                { task: 'Bank reconciliation', done: false, ref: '4 unmatched items in GCB Operating' },
                { task: 'Inventory revaluation', done: true, ref: 'F&B count complete · 24 Apr' },
                { task: 'Accruals posted', done: true, ref: 'JV-2026-0082 · 23 Apr' },
                { task: 'Depreciation run', done: false, ref: 'Schedule for 30 Apr' },
                { task: 'FX revaluation (USD)', done: false, ref: 'JV-2026-0081 awaiting GM approval' },
                { task: 'VAT return draft', done: false, ref: 'Due 15 May' },
                { task: 'Period lock April', done: false, ref: 'Schedule for 05 May' },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5" style={{ background: t.done ? theme.leafSoft + '40' : theme.bg, border: `1px solid ${t.done ? theme.leaf + '30' : theme.ruleSoft}` }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: t.done ? theme.leaf : theme.ruleSoft, color: t.done ? '#FBF7EE' : theme.inkMute }}>
                    {t.done ? <Check size={11} /> : null}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm" style={{ color: theme.ink, fontWeight: t.done ? 400 : 500 }}>{t.task}</div>
                    <div className="text-[10px]" style={{ color: theme.inkMute }}>{t.ref}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title="Recent Journal Activity" accent={theme.dusk} padded={false}
          action={<Btn variant="ghost" size="sm" icon={ArrowRight} onClick={() => setActiveNav('ca-jv')}>Open journals</Btn>}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>JV</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Description</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Prepared by</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Total</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {JOURNAL_VOUCHERS.slice(0, 5).map((jv, i, arr) => (
                <tr key={jv.id} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5">
                    <div className="font-mono" style={{ color: theme.ink, fontWeight: 500 }}>{jv.id}</div>
                    <div className="text-[10px]" style={{ color: theme.inkMute }}>{jv.date}</div>
                  </td>
                  <td className="py-3 px-3" style={{ color: theme.ink }}>{jv.description}</td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{jv.preparedBy}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{cedi(jv.total)}</td>
                  <td className="py-3 px-5">
                    <Pill tone={jv.status === 'posted' ? 'leaf' : jv.status === 'pending-approval' ? 'gold' : 'neutral'} size="sm">
                      {jv.status.replace('-', ' ')}
                    </Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// GENERAL LEDGER
// ============================================================================
const LedgerModule = () => {
  const [filterType, setFilterType] = useState('all');
  const types = ['all', 'Asset', 'Liability', 'Equity', 'Revenue', 'Expense'];
  const filtered = COA.filter(a => filterType === 'all' || a.type === filterType);

  // Group by parent for indented display
  const topLevel = filtered.filter(a => !a.parent);
  const childrenOf = (code) => filtered.filter(a => a.parent === code);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Chart of Accounts</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>General Ledger</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>USALI-aligned · {COA.length} accounts · click any account for transaction history</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Download}>Export GL</Btn>
            <Btn variant="primary" icon={Plus}>New Account</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="flex items-center gap-2 p-3 flex-wrap" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
          <span className="text-[10px] uppercase mr-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Type</span>
          {types.map(t => (
            <button key={t} onClick={() => setFilterType(t)} className="text-xs px-3 py-1.5"
              style={{ background: filterType === t ? theme.ink : 'transparent', color: filterType === t ? theme.bgPanel : theme.inkSoft, border: `1px solid ${filterType === t ? theme.ink : theme.rule}`, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {t === 'all' ? 'All' : t}
            </button>
          ))}
          <div className="flex-1" />
          <span className="text-xs" style={{ color: theme.inkMute }}>{filtered.length} accounts</span>
        </div>

        <Card title="Account Balances · As of 25 Apr 2026" accent={theme.teal} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Code</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Account Name</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Type</th>
                <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {topLevel.map(parent => {
                const kids = childrenOf(parent.code);
                return (
                  <React.Fragment key={parent.code}>
                    <tr style={{ borderBottom: `1px solid ${theme.ruleSoft}`, background: theme.bgPanelAlt + '40' }}>
                      <td className="py-3 px-5 font-mono text-xs" style={{ color: theme.gold, fontWeight: 600 }}>{parent.code}</td>
                      <td className="py-3 px-3 font-serif" style={{ color: theme.ink, fontSize: '15px', fontWeight: 600 }}>{parent.name}</td>
                      <td className="py-3 px-3"><Pill tone={parent.type === 'Asset' ? 'teal' : parent.type === 'Liability' ? 'clay' : parent.type === 'Equity' ? 'dusk' : parent.type === 'Revenue' ? 'leaf' : 'gold'} size="sm">{parent.type}</Pill></td>
                      <td className="py-3 px-5 text-right font-mono" style={{ color: theme.ink, fontWeight: 700 }}>{fmtNeg(parent.balance)}</td>
                    </tr>
                    {kids.map(k => (
                      <tr key={k.code} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                        <td className="py-2.5 px-5 font-mono text-xs" style={{ color: theme.inkSoft, paddingLeft: 36 }}>{k.code}</td>
                        <td className="py-2.5 px-3 text-sm" style={{ color: theme.ink }}>{k.name}</td>
                        <td className="py-2.5 px-3"></td>
                        <td className="py-2.5 px-5 text-right font-mono text-sm" style={{ color: theme.inkSoft }}>{fmtNeg(k.balance)}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};


// ============================================================================
// TRIAL BALANCE / P&L / BALANCE SHEET
// ============================================================================
const StatementsModule = () => {
  const [view, setView] = useState('pnl');

  const revenue = COA.filter(a => a.type === 'Revenue' && !a.parent);
  const expenses = COA.filter(a => a.type === 'Expense');
  const totalRevenue = -revenue.reduce((s, a) => s + a.balance, 0);
  const totalExpenses = expenses.reduce((s, a) => s + a.balance, 0);
  const grossProfit = totalRevenue - totalExpenses;

  const assets = COA.filter(a => a.type === 'Asset' && !a.parent);
  const liabilities = COA.filter(a => a.type === 'Liability' && !a.parent);
  const equity = COA.filter(a => a.type === 'Equity');
  const totalAssets = assets.reduce((s, a) => s + a.balance, 0);
  const totalLiabilities = liabilities.reduce((s, a) => s + a.balance, 0);
  const totalEquity = equity.reduce((s, a) => s + a.balance, 0);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Period · April 2026</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Trial Balance & P&amp;L</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Period: 1–25 April 2026 (open) · vs prior month and budget</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Calendar}>Change Period</Btn>
            <Btn variant="primary" icon={Download}>Export to PDF</Btn>
          </div>
        </div>
        <div className="px-8 flex gap-1" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
          {[
            { id: 'pnl', label: 'Profit & Loss' },
            { id: 'tb', label: 'Trial Balance' },
            { id: 'bs', label: 'Balance Sheet' },
          ].map(t => {
            const active = view === t.id;
            return (
              <button key={t.id} onClick={() => setView(t.id)}
                className="px-4 py-3 text-sm transition-all"
                style={{ color: active ? theme.ink : theme.inkSoft, fontWeight: active ? 600 : 400, borderBottom: active ? `2px solid ${theme.gold}` : '2px solid transparent', marginBottom: '-1px' }}>
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6">
        {view === 'pnl' && (
          <Card title="Profit &amp; Loss · April 2026 (1–25 Apr)" accent={theme.gold} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Account</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>MTD Actual</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>MTD Budget</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Variance</th>
                  <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Var %</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: theme.bgPanelAlt + '60' }}>
                  <td className="py-2.5 px-5 font-serif" style={{ color: theme.ink, fontWeight: 700 }} colSpan={5}>Revenue</td>
                </tr>
                {revenue.map(r => {
                  const actual = -r.balance;
                  const budget = actual / 1.08; // mock 8% favorable
                  const variance = actual - budget;
                  const varPct = (variance / budget) * 100;
                  return (
                    <tr key={r.code} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                      <td className="py-2.5 px-5">
                        <span className="font-mono text-xs mr-2" style={{ color: theme.inkMute }}>{r.code}</span>
                        <span style={{ color: theme.ink }}>{r.name}</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(actual)}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-xs" style={{ color: theme.inkSoft }}>{cedi(budget)}</td>
                      <td className="py-2.5 px-3 text-right font-mono" style={{ color: theme.leaf, fontWeight: 600 }}>+{cedi(variance)}</td>
                      <td className="py-2.5 px-5 text-right font-mono" style={{ color: theme.leaf, fontWeight: 600 }}>+{varPct.toFixed(1)}%</td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop: `2px solid ${theme.ink}`, background: theme.leafSoft + '30' }}>
                  <td className="py-3 px-5 font-serif" style={{ color: theme.ink, fontWeight: 700 }}>Total Revenue</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.leaf, fontWeight: 700, fontSize: '15px' }}>{cedi(totalRevenue)}</td>
                  <td className="py-3 px-3 text-right font-mono text-xs" style={{ color: theme.inkSoft }}>{cedi(totalRevenue / 1.08)}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.leaf, fontWeight: 700 }}>+{cedi(totalRevenue - totalRevenue/1.08)}</td>
                  <td className="py-3 px-5 text-right font-mono" style={{ color: theme.leaf, fontWeight: 700 }}>+8.0%</td>
                </tr>

                <tr><td className="py-2"></td></tr>
                <tr style={{ background: theme.bgPanelAlt + '60' }}>
                  <td className="py-2.5 px-5 font-serif" style={{ color: theme.ink, fontWeight: 700 }} colSpan={5}>Operating Expenses</td>
                </tr>
                {expenses.map(e => {
                  const actual = e.balance;
                  // F&B Cost overrun matches story
                  const overrun = e.code === '5100' ? 1.12 : 1.04;
                  const budget = actual / overrun;
                  const variance = actual - budget;
                  const varPct = (variance / budget) * 100;
                  const unfav = variance > 0;
                  return (
                    <tr key={e.code} style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                      <td className="py-2.5 px-5">
                        <span className="font-mono text-xs mr-2" style={{ color: theme.inkMute }}>{e.code}</span>
                        <span style={{ color: theme.ink }}>{e.name}</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(actual)}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-xs" style={{ color: theme.inkSoft }}>{cedi(budget)}</td>
                      <td className="py-2.5 px-3 text-right font-mono" style={{ color: unfav ? theme.clay : theme.leaf, fontWeight: 600 }}>{unfav ? '+' : ''}{cedi(variance)}</td>
                      <td className="py-2.5 px-5 text-right font-mono" style={{ color: unfav ? theme.clay : theme.leaf, fontWeight: 600 }}>{unfav ? '+' : ''}{varPct.toFixed(1)}%</td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop: `1px solid ${theme.ink}`, background: theme.claySoft + '20' }}>
                  <td className="py-3 px-5 font-serif" style={{ color: theme.ink, fontWeight: 700 }}>Total Expenses</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.clay, fontWeight: 700, fontSize: '15px' }}>{cedi(totalExpenses)}</td>
                  <td className="py-3 px-3"></td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.clay, fontWeight: 700 }}>+{cedi(totalExpenses * 0.06)}</td>
                  <td className="py-3 px-5 text-right font-mono" style={{ color: theme.clay, fontWeight: 700 }}>+6.0%</td>
                </tr>

                <tr><td className="py-2"></td></tr>
                <tr style={{ borderTop: `3px double ${theme.ink}`, background: theme.goldSoft + '40' }}>
                  <td className="py-4 px-5 font-serif" style={{ color: theme.ink, fontSize: '17px', fontWeight: 700 }}>Gross Profit</td>
                  <td className="py-4 px-3 text-right font-serif" style={{ color: theme.gold, fontSize: '20px', letterSpacing: '-0.02em', fontWeight: 700 }}>{cedi(grossProfit)}</td>
                  <td className="py-4 px-3"></td>
                  <td className="py-4 px-3 text-right font-mono" style={{ color: theme.leaf, fontWeight: 700 }}></td>
                  <td className="py-4 px-5 text-right font-serif" style={{ color: theme.gold, fontSize: '17px', fontWeight: 700 }}>{pct(grossProfit / totalRevenue * 100)} margin</td>
                </tr>
              </tbody>
            </table>
          </Card>
        )}

        {view === 'tb' && (
          <Card title="Trial Balance · 25 April 2026" accent={theme.teal} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Account</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Debit</th>
                  <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Credit</th>
                </tr>
              </thead>
              <tbody>
                {COA.filter(a => !a.parent).map((a, i, arr) => {
                  const isDebit = a.type === 'Asset' || a.type === 'Expense';
                  const debit = isDebit ? Math.abs(a.balance) : 0;
                  const credit = isDebit ? 0 : Math.abs(a.balance);
                  return (
                    <tr key={a.code} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                      <td className="py-2.5 px-5">
                        <span className="font-mono text-xs mr-2" style={{ color: theme.inkMute }}>{a.code}</span>
                        <span style={{ color: theme.ink }}>{a.name}</span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono" style={{ color: debit > 0 ? theme.ink : theme.ruleSoft }}>{debit > 0 ? cedi(debit) : '—'}</td>
                      <td className="py-2.5 px-5 text-right font-mono" style={{ color: credit > 0 ? theme.ink : theme.ruleSoft }}>{credit > 0 ? cedi(credit) : '—'}</td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop: `2px solid ${theme.ink}`, background: theme.bgPanelAlt }}>
                  <td className="py-3 px-5 font-serif" style={{ color: theme.ink, fontWeight: 700 }}>Totals · Trial Balance</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.gold, fontWeight: 700, fontSize: '15px' }}>
                    {cedi(COA.filter(a => !a.parent && (a.type === 'Asset' || a.type === 'Expense')).reduce((s, a) => s + Math.abs(a.balance), 0))}
                  </td>
                  <td className="py-3 px-5 text-right font-mono" style={{ color: theme.gold, fontWeight: 700, fontSize: '15px' }}>
                    {cedi(COA.filter(a => !a.parent && (a.type !== 'Asset' && a.type !== 'Expense')).reduce((s, a) => s + Math.abs(a.balance), 0))}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        )}

        {view === 'bs' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Assets · 25 April 2026" accent={theme.teal} padded={false}>
              <table className="w-full text-sm">
                <tbody>
                  {assets.map((a, i) => (
                    <tr key={a.code} style={{ borderBottom: i < assets.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                      <td className="py-3 px-5">
                        <span className="font-mono text-xs mr-2" style={{ color: theme.inkMute }}>{a.code}</span>
                        <span style={{ color: theme.ink }}>{a.name}</span>
                      </td>
                      <td className="py-3 px-5 text-right font-mono" style={{ color: theme.ink }}>{cedi(a.balance)}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: `2px solid ${theme.ink}`, background: theme.bgPanelAlt }}>
                    <td className="py-3 px-5 font-serif" style={{ color: theme.ink, fontWeight: 700 }}>Total Assets</td>
                    <td className="py-3 px-5 text-right font-serif" style={{ color: theme.gold, fontWeight: 700, fontSize: '17px' }}>{cedi(totalAssets)}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
            <div className="space-y-6">
              <Card title="Liabilities" accent={theme.clay} padded={false}>
                <table className="w-full text-sm">
                  <tbody>
                    {liabilities.map((a, i) => (
                      <tr key={a.code} style={{ borderBottom: i < liabilities.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                        <td className="py-3 px-5">
                          <span className="font-mono text-xs mr-2" style={{ color: theme.inkMute }}>{a.code}</span>
                          <span style={{ color: theme.ink }}>{a.name}</span>
                        </td>
                        <td className="py-3 px-5 text-right font-mono" style={{ color: theme.ink }}>{cedi(a.balance)}</td>
                      </tr>
                    ))}
                    <tr style={{ borderTop: `1px solid ${theme.ink}`, background: theme.claySoft + '20' }}>
                      <td className="py-2.5 px-5 font-serif" style={{ color: theme.ink, fontWeight: 700 }}>Total Liabilities</td>
                      <td className="py-2.5 px-5 text-right font-mono" style={{ color: theme.clay, fontWeight: 700 }}>{cedi(totalLiabilities)}</td>
                    </tr>
                  </tbody>
                </table>
              </Card>
              <Card title="Equity" accent={theme.dusk} padded={false}>
                <table className="w-full text-sm">
                  <tbody>
                    {equity.map((a, i) => (
                      <tr key={a.code} style={{ borderBottom: i < equity.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                        <td className="py-3 px-5">
                          <span className="font-mono text-xs mr-2" style={{ color: theme.inkMute }}>{a.code}</span>
                          <span style={{ color: theme.ink }}>{a.name}</span>
                        </td>
                        <td className="py-3 px-5 text-right font-mono" style={{ color: theme.ink }}>{cedi(a.balance)}</td>
                      </tr>
                    ))}
                    <tr style={{ borderTop: `1px solid ${theme.ink}`, background: theme.duskSoft + '40' }}>
                      <td className="py-2.5 px-5 font-serif" style={{ color: theme.ink, fontWeight: 700 }}>Total Equity</td>
                      <td className="py-2.5 px-5 text-right font-mono" style={{ color: theme.dusk, fontWeight: 700 }}>{cedi(totalEquity)}</td>
                    </tr>
                  </tbody>
                </table>
              </Card>
              <div className="p-4 text-center" style={{ background: theme.goldSoft + '40', border: `2px solid ${theme.gold}` }}>
                <div className="text-[10px] uppercase mb-1" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>Total Liabilities + Equity</div>
                <div className="font-serif" style={{ fontSize: '24px', color: theme.gold, letterSpacing: '-0.02em', fontWeight: 700 }}>{cedi(totalLiabilities + totalEquity)}</div>
                <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>{Math.abs(totalAssets - totalLiabilities - totalEquity) < 1 ? '✓ Books balance' : '⚠ Off by ' + cedi(Math.abs(totalAssets - totalLiabilities - totalEquity))}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// ============================================================================
// ACCOUNTS RECEIVABLE
// ============================================================================
const ARModule = () => {
  const buckets = ['current', '1-30', '31-60', '60+'];
  const totals = buckets.reduce((acc, b) => {
    acc[b] = AR_LEDGER.filter(r => r.ageBucket === b).reduce((s, r) => s + r.balance, 0);
    return acc;
  }, {});
  const total = Object.values(totals).reduce((s, v) => s + v, 0);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>City Ledger</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Accounts Receivable</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{AR_LEDGER.length} open invoices · {cedi(total)} outstanding</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Mail}>Send Statements</Btn>
            <Btn variant="primary" icon={Send}>Run Dunning</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {buckets.map(b => {
            const tone = b === 'current' ? 'leaf' : b === '1-30' ? 'teal' : b === '31-60' ? 'gold' : 'clay';
            const accent = tone === 'leaf' ? theme.leaf : tone === 'teal' ? theme.teal : tone === 'gold' ? theme.gold : theme.clay;
            return (
              <KpiTile key={b} label={ageBucketLabel(b)} value={cedi(totals[b])} sublabel={`${AR_LEDGER.filter(r => r.ageBucket === b).length} invoice${AR_LEDGER.filter(r => r.ageBucket === b).length !== 1 ? 's' : ''}`} icon={Clock3} tone={accent} />
            );
          })}
        </div>

        <Card title="Open Invoices · City Ledger" accent={theme.gold} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Invoice</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Client</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Invoice Date</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Due</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Balance</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Age</th>
                <th className="text-right py-3 px-5"></th>
              </tr>
            </thead>
            <tbody>
              {AR_LEDGER.map((r, i) => {
                const tone = r.ageBucket === 'current' ? 'leaf' : r.ageBucket === '1-30' ? 'teal' : r.ageBucket === '31-60' ? 'gold' : 'clay';
                return (
                  <tr key={r.id} style={{ borderBottom: i < AR_LEDGER.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5">
                      <div className="font-mono text-xs" style={{ color: theme.ink, fontWeight: 500 }}>{r.id}</div>
                      <div className="text-[10px] italic" style={{ color: theme.inkMute }}>{r.notes}</div>
                    </td>
                    <td className="py-3 px-3" style={{ color: theme.ink, fontWeight: 500 }}>{r.client}</td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{r.invoiceDate}</td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{r.dueDate}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{cedi(r.balance)}</td>
                    <td className="py-3 px-3"><Pill tone={tone} size="sm">{ageBucketLabel(r.ageBucket)}</Pill></td>
                    <td className="py-3 px-5 text-right">
                      <Btn variant="ghost" size="sm" icon={Mail}>Remind</Btn>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// ACCOUNTS PAYABLE
// ============================================================================
const APModule = () => {
  const total = AP_INVOICES.reduce((s, i) => s + i.amount, 0);
  const matched = AP_INVOICES.filter(i => i.status === '3-way-matched').length;
  const overdue = AP_INVOICES.filter(i => i.status === 'overdue').length;
  const awaitingGRN = AP_INVOICES.filter(i => i.status === 'awaiting-grn').length;

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Vendor Payments</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Accounts Payable</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{AP_INVOICES.length} open invoices · {cedi(total)} due · 3-way match enforced</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Plus}>Record Invoice</Btn>
            <Btn variant="primary" icon={Send}>Run Payment Batch</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Open Invoices" value={AP_INVOICES.length} sublabel="this week" icon={FileText} tone={theme.dusk} />
          <KpiTile label="3-Way Matched" value={matched} sublabel="ready to pay" icon={CircleCheck} tone={theme.leaf} />
          <KpiTile label="Awaiting GRN" value={awaitingGRN} sublabel="need receiving" icon={Clock3} tone={theme.gold} />
          <KpiTile label="Overdue" value={overdue} sublabel="follow up" icon={AlertCircle} tone={theme.clay} />
        </div>

        <Card title="Vendor Invoices" accent={theme.dusk} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Invoice</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Vendor</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>3-Way Match</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Amount</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Due</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {AP_INVOICES.map((inv, i) => {
                const tone = inv.status === '3-way-matched' ? 'leaf' : inv.status === 'awaiting-grn' ? 'gold' : inv.status === 'overdue' ? 'clay' : 'neutral';
                return (
                  <tr key={inv.id} style={{ borderBottom: i < AP_INVOICES.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5">
                      <div className="font-mono text-xs" style={{ color: theme.ink, fontWeight: 500 }}>{inv.id}</div>
                      <div className="text-[10px] italic" style={{ color: theme.inkMute }}>{inv.notes}</div>
                    </td>
                    <td className="py-3 px-3" style={{ color: theme.ink, fontWeight: 500 }}>{inv.vendor}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2 text-[10px]" style={{ color: theme.inkSoft }}>
                        <span className={inv.poRef ? '' : 'opacity-30'}>{inv.poRef ? '✓ PO' : '○ PO'}</span>
                        <span className={inv.grnRef ? '' : 'opacity-30'}>{inv.grnRef ? '✓ GRN' : '○ GRN'}</span>
                        <span>✓ Inv</span>
                      </div>
                      <div className="font-mono text-[10px] mt-0.5" style={{ color: theme.inkMute }}>
                        {inv.poRef && `${inv.poRef}`}{inv.poRef && inv.grnRef && ' · '}{inv.grnRef}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{cedi(inv.amount)}</td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{inv.dueDate}</td>
                    <td className="py-3 px-5"><Pill tone={tone} size="sm">{inv.status.replace(/-/g, ' ')}</Pill></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// BANK RECONCILIATION
// ============================================================================
const BankModule = () => {
  const [matches, setMatches] = useState({});
  const handleMatch = (id) => setMatches(prev => ({ ...prev, [id]: true }));

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Bank Accounts</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Bank Reconciliation</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Last statement import: 24 April 2026 · {UNMATCHED_BANK_ITEMS.length} items unmatched</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Download}>Import Statement</Btn>
            <Btn variant="primary" icon={Check}>Auto-Match</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {BANK_ACCOUNTS.map(b => {
            const diff = b.statementBalance - b.glBalance;
            return (
              <div key={b.id} className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${diff === 0 ? theme.leaf : theme.gold}` }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-[10px] uppercase" style={{ color: theme.gold, letterSpacing: '0.16em', fontWeight: 700 }}>{b.currency} Account</div>
                    <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>{b.name}</div>
                  </div>
                  {b.unmatched > 0 ? <Pill tone="gold">{b.unmatched} unmatched</Pill> : <Pill tone="leaf">Reconciled</Pill>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Statement</div>
                    <div className="font-serif text-xl" style={{ color: theme.ink }}>{cedi(b.statementBalance)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>GL Balance</div>
                    <div className="font-serif text-xl" style={{ color: theme.ink }}>{cedi(b.glBalance)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em' }}>Difference</div>
                    <div className="font-serif text-xl" style={{ color: diff === 0 ? theme.leaf : theme.gold }}>{cedi(diff)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Card title="Unmatched Items · GCB Operating Account" accent={theme.gold} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Date</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Description</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Amount</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Suggested Match</th>
                <th className="text-right py-3 px-5"></th>
              </tr>
            </thead>
            <tbody>
              {UNMATCHED_BANK_ITEMS.map((b, i) => (
                <tr key={b.id} style={{ borderBottom: i < UNMATCHED_BANK_ITEMS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none', opacity: matches[b.id] ? 0.5 : 1 }}>
                  <td className="py-3 px-5 font-mono text-xs" style={{ color: theme.inkSoft }}>{b.date}</td>
                  <td className="py-3 px-3" style={{ color: theme.ink, fontWeight: 500 }}>{b.description}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: b.type === 'credit' ? theme.leaf : theme.clay, fontWeight: 600 }}>
                    {b.type === 'credit' ? '+' : '−'}{cedi(Math.abs(b.amount))}
                  </td>
                  <td className="py-3 px-3 font-mono text-xs" style={{ color: theme.gold }}>{b.suggestedMatch}</td>
                  <td className="py-3 px-5 text-right">
                    {matches[b.id]
                      ? <Pill tone="leaf" size="sm"><Check size={9} /> Matched</Pill>
                      : <Btn variant="primary" size="sm" icon={Check} onClick={() => handleMatch(b.id)}>Match</Btn>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// JOURNAL VOUCHERS
// ============================================================================
const JVModule = () => {
  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Manual Journals</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Journal Vouchers</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{JOURNAL_VOUCHERS.length} JVs this period · period April 2026 open</div>
          </div>
          <Btn variant="primary" icon={Plus}>New Journal Voucher</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="p-4 flex items-start gap-3" style={{ background: theme.duskSoft + '40', border: `1px solid ${theme.dusk}30`, borderLeft: `3px solid ${theme.dusk}` }}>
          <Key size={14} style={{ color: theme.dusk, marginTop: 2 }} />
          <div className="text-sm" style={{ color: theme.inkSoft }}>
            <span style={{ color: theme.ink, fontWeight: 600 }}>Period locks: </span>
            April 2026 is open · March 2026 locked since 04 Apr · Re-opening a locked period requires GM authorization and creates a full audit trail.
          </div>
        </div>

        <Card title="Journal Vouchers · April 2026" accent={theme.gold} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>JV</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Description</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Prepared By</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Total</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {JOURNAL_VOUCHERS.map((jv, i) => (
                <tr key={jv.id} style={{ borderBottom: i < JOURNAL_VOUCHERS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5">
                    <div className="font-mono" style={{ color: theme.ink, fontWeight: 500 }}>{jv.id}</div>
                    <div className="text-[10px]" style={{ color: theme.inkMute }}>{jv.date}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div style={{ color: theme.ink }}>{jv.description}</div>
                    {jv.notes && <div className="text-[10px] italic mt-0.5" style={{ color: theme.inkSoft }}>{jv.notes}</div>}
                  </td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{jv.preparedBy}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{cedi(jv.total)}</td>
                  <td className="py-3 px-5"><Pill tone={jv.status === 'posted' ? 'leaf' : jv.status === 'pending-approval' ? 'gold' : 'neutral'} size="sm">{jv.status.replace(/-/g, ' ')}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// TAX RETURNS
// ============================================================================
const TaxModule = () => {
  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Statutory Filings</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Tax Returns</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>VAT + Tourism Levy · PAYE · SSNIT · Ghana Revenue Authority and SSNIT filings</div>
          </div>
          <Btn variant="primary" icon={Send}>File Current Period</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <Card title="Tax Periods" accent={theme.dusk} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Period</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>VAT Output</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Tourism Levy</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>PAYE</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>SSNIT (E+R)</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Total Due</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Due Date</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {TAX_PERIODS.map((p, i) => {
                const total = p.vat + p.tourism + p.paye + p.ssnit;
                const tone = p.status === 'filed' ? 'leaf' : 'gold';
                return (
                  <tr key={p.period} style={{ borderBottom: i < TAX_PERIODS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5" style={{ color: theme.ink, fontWeight: 500 }}>{p.period}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(p.vat)}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(p.tourism)}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(p.paye)}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(p.ssnit)}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.gold, fontWeight: 700 }}>{cedi(total)}</td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{p.dueDate}</td>
                    <td className="py-3 px-5">
                      <Pill tone={tone} size="sm">
                        {p.status === 'filed' ? <><Check size={9} /> Filed {p.filedOn}</> : 'Draft'}
                      </Pill>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.gold}` }}>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.16em', fontWeight: 700 }}>April 2026 · Draft</div>
            <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>Returns due in 20 days</div>
            <p className="text-sm mt-2" style={{ color: theme.inkSoft }}>Pre-fill complete from GL postings. Need final review and GM signature before filing on Ghana Revenue Authority portal.</p>
            <div className="mt-3"><Btn variant="primary" size="sm" icon={Eye}>Review Draft</Btn></div>
          </div>
          <div className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.leaf}` }}>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.leaf, letterSpacing: '0.16em', fontWeight: 700 }}>YTD · 2026</div>
            <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>3 of 12 returns filed</div>
            <p className="text-sm mt-2" style={{ color: theme.inkSoft }}>All filings to date submitted on time. {cedi(TAX_PERIODS.filter(p => p.status === 'filed').reduce((s, p) => s + p.vat + p.tourism + p.paye + p.ssnit, 0))} remitted YTD.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// FIXED ASSETS
// ============================================================================
const AssetsModule = () => {
  const totalCost = FIXED_ASSETS.reduce((s, a) => s + a.cost, 0);
  const totalDepr = FIXED_ASSETS.reduce((s, a) => s + a.accumDepr, 0);
  const totalNBV = FIXED_ASSETS.reduce((s, a) => s + a.nbv, 0);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>PP&amp;E Register</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Fixed Assets</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{FIXED_ASSETS.length} capitalized assets · NBV {cedi(totalNBV)}</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={RefreshCw}>Run Depreciation</Btn>
            <Btn variant="primary" icon={Plus}>Capitalize Asset</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiTile label="Total Cost" value={cedi(totalCost)} sublabel="acquisition value" icon={DollarSign} />
          <KpiTile label="Accumulated Depreciation" value={cedi(totalDepr)} sublabel={pct(totalDepr / totalCost * 100) + ' depreciated'} icon={TrendingDown} tone={theme.clay} />
          <KpiTile label="Net Book Value" value={cedi(totalNBV)} sublabel="on balance sheet" icon={Briefcase} tone={theme.gold} />
        </div>

        <Card title="Asset Register" accent={theme.dusk} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Asset</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Category</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Acquired</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Cost</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Method</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Accum. Depr</th>
                <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>NBV</th>
              </tr>
            </thead>
            <tbody>
              {FIXED_ASSETS.map((a, i) => (
                <tr key={a.id} style={{ borderBottom: i < FIXED_ASSETS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5">
                    <div style={{ color: theme.ink, fontWeight: 500 }}>{a.name}</div>
                    <div className="font-mono text-[10px]" style={{ color: theme.inkMute }}>{a.id}</div>
                  </td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{a.category}</td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{a.acquired}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(a.cost)}</td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{a.deprMethod}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.clay }}>({cedi(a.accumDepr)})</td>
                  <td className="py-3 px-5 text-right font-mono" style={{ color: theme.gold, fontWeight: 600 }}>{cedi(a.nbv)}</td>
                </tr>
              ))}
              <tr style={{ borderTop: `2px solid ${theme.ink}`, background: theme.bgPanelAlt }}>
                <td className="py-3 px-5 font-serif" style={{ color: theme.ink, fontWeight: 700 }} colSpan={3}>Total</td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 700 }}>{cedi(totalCost)}</td>
                <td className="py-3 px-3"></td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: theme.clay, fontWeight: 700 }}>({cedi(totalDepr)})</td>
                <td className="py-3 px-5 text-right font-mono" style={{ color: theme.gold, fontWeight: 700, fontSize: '15px' }}>{cedi(totalNBV)}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// COMING SOON
// ============================================================================
const CaComingSoon = ({ title }) => (
  <div className="p-4 md:p-6" style={{ background: theme.bg, minHeight: '100%' }}>
    <SectionHeader overline="Module" title={title} />
    <div className="p-12 text-center" style={{ background: theme.bgPanel, border: `1px dashed ${theme.rule}` }}>
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ background: theme.tealSoft, color: theme.teal }}><Sparkles size={20} /></div>
      <p className="font-serif text-lg mb-2" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Module defined in the BRD</p>
      <p className="text-sm" style={{ color: theme.inkSoft }}>To be built in the next sprint.</p>
    </div>
  </div>
);

// ============================================================================
// APP
// ============================================================================
const CaApp = () => {
  const [activeNav, setActiveNav] = useState('ca-overview');
  let content;
  if (activeNav === 'ca-overview') content = <FinanceOverview setActiveNav={setActiveNav} />;
  else if (activeNav === 'ca-ledger') content = <LedgerModule />;
  else if (activeNav === 'ca-statements') content = <StatementsModule />;
  else if (activeNav === 'ca-ar') content = <ARModule />;
  else if (activeNav === 'ca-ap') content = <APModule />;
  else if (activeNav === 'ca-bank') content = <BankModule />;
  else if (activeNav === 'ca-jv') content = <JVModule />;
  else if (activeNav === 'ca-tax') content = <TaxModule />;
  else if (activeNav === 'ca-assets') content = <AssetsModule />;
  else content = <CaComingSoon title="Module" />;

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: theme.bg, fontFamily: '"Inter", system-ui, sans-serif', color: theme.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.rule}; }
      `}</style>
      <CaSidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <CaTopBar />
        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
};



// ============================================================================
// PURCHASING MANAGER · Kojo Asare
// ============================================================================
const PM_NAV = [
  { id: 'pm-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'pm-prs', label: 'Purchase Requisitions', icon: FileText, badge: 5 },
  { id: 'pm-rfqs', label: 'RFQ Comparison', icon: BarChart3, badge: 2 },
  { id: 'pm-pos', label: 'Purchase Orders', icon: FileSignature },
  { id: 'pm-grns', label: 'Goods Received', icon: Truck },
  { id: 'pm-vendors', label: 'Vendor Directory', icon: Building2 },
  { id: 'pm-performance', label: 'Vendor Performance', icon: Activity },
  { id: 'pm-stock', label: 'Stock Movements', icon: Package },
];

const pm_ME = { initials: 'KA', name: 'Kojo Asare', role: 'Purchasing Manager' };

// ============================================================================
// SIDEBAR
// ============================================================================
const PmSidebar = ({ activeNav, setActiveNav }) => (
  <aside className="hidden md:flex w-64 flex-shrink-0 flex-col" style={{ background: theme.navBg, color: '#FBF7EE' }}>
    <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <FloatLogo size="md" />
          <div className="text-[10px] mt-1" style={{ color: theme.gold, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Ghana</div>
        </div>
      </div>
    </div>
    <div className="px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium" style={{ background: theme.gold, color: theme.navBg, fontSize: '13px' }}>{pm_ME.initials}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm" style={{ fontWeight: 500 }}>{pm_ME.name}</div>
          <div className="text-[10px]" style={{ color: theme.gold, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>{pm_ME.role}</div>
        </div>
      </div>
    </div>
    <nav className="flex-1 px-3 py-3 overflow-y-auto">
      {PM_NAV.map(item => {
        const Icon = item.icon;
        const active = activeNav === item.id;
        return (
          <button key={item.id} onClick={() => setActiveNav(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all text-sm"
            style={{ background: active ? 'rgba(185,135,64,0.15)' : 'transparent', color: active ? theme.gold : 'rgba(255,255,255,0.75)', borderLeft: active ? `3px solid ${theme.gold}` : '3px solid transparent', fontWeight: active ? 600 : 400 }}>
            <Icon size={15} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: theme.gold, color: theme.navBg, fontWeight: 700 }}>{item.badge}</span>}
          </button>
        );
      })}
    </nav>
    <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span>v1.0</span>
        <button className="hover:text-white"><LogOut size={12} /></button>
      </div>
    </div>
  </aside>
);

const PmTopBar = () => (
  <div className="flex items-center justify-between pl-16 pr-4 md:px-8 py-3 md:py-4" style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
    <div className="flex items-center gap-3 text-sm" style={{ color: theme.inkSoft }}>
      <Calendar size={14} /><span className="hidden md:inline">Saturday, 25 April 2026 · 5 PRs awaiting action
    </span><span className="md:hidden">Sat 25 Apr</span></div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
        <Search size={13} style={{ color: theme.inkMute }} />
        <input placeholder="Search PRs, POs, vendors…" className="bg-transparent outline-none text-sm w-56" style={{ color: theme.ink }} />
      </div>
      <button className="relative p-2"><Bell size={15} style={{ color: theme.inkSoft }} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: theme.gold }} /></button>
    </div>
  </div>
);

// ============================================================================
// MOCK DATA
// ============================================================================
// Purchase Requisitions awaiting action
const PRS = [
  { id: 'PR-2092', dept: 'Kitchen', requester: 'Chef Olamide', dateRaised: '25 Apr', items: 'Lake prawns 4kg, hibiscus 2kg, tomato 8kg', estimate: 1980, urgency: 'high', status: 'awaiting-rfq', notes: 'Needed for tonight if possible — direct purchase OK' },
  { id: 'PR-2091', dept: 'Housekeeping', requester: 'Akua Mensah', dateRaised: '24 Apr', items: 'Bath towel sets ×12, bathrobes ×8', estimate: 3200, urgency: 'normal', status: 'awaiting-rfq', notes: 'Replacement for worn linen' },
  { id: 'PR-2089', dept: 'Kitchen', requester: 'Chef Olamide', dateRaised: '25 Apr', items: 'Weekend produce + wine top-up (full list)', estimate: 8400, urgency: 'high', status: 'po-issued', notes: 'PO-1141 issued · awaiting delivery' },
  { id: 'PR-2088', dept: 'Maintenance', requester: 'Sipho Dube', dateRaised: '23 Apr', items: 'Hayward 1.5HP pool pump + install + parts', estimate: 5800, urgency: 'high', status: 'po-issued', notes: 'PO-1140 issued · pool down · linked to PM-008' },
  { id: 'PR-2086', dept: 'F&B', requester: 'Yaa Owusu', dateRaised: '22 Apr', items: 'Stemware replacement (broken inventory)', estimate: 1840, urgency: 'normal', status: 'awaiting-rfq', notes: 'Send RFQ to 3 suppliers' },
  { id: 'PR-2085', dept: 'IT', requester: 'GM (interim)', dateRaised: '20 Apr', items: 'POS terminal replacement (1 unit)', estimate: 4200, urgency: 'normal', status: 'awaiting-rfq', notes: 'Old terminal at FO crashing' },
  { id: 'PR-2083', dept: 'Maintenance', requester: 'Sipho Dube', dateRaised: '18 Apr', items: 'Generator service + filters + oil', estimate: 2400, urgency: 'normal', status: 'awaiting-rfq', notes: 'Annual service overdue' },
];

// Active RFQs
const RFQS = [
  {
    id: 'RFQ-0418', subject: 'Stemware replacement', dateSent: '23 Apr', dueDate: '28 Apr', linkedPR: 'PR-2086',
    quotes: [
      { vendor: 'Kente Hospitality Wares', amount: 1840, leadTime: 7, paymentTerms: 'Net 30', notes: 'Standard glass · matches current set' },
      { vendor: 'Accra Glassware Co.', amount: 1620, leadTime: 14, paymentTerms: 'Net 14', notes: 'Lower price · longer lead time' },
      { vendor: 'Premium Tableware GH', amount: 2240, leadTime: 5, paymentTerms: 'Net 30', notes: 'Higher quality · Schott Zwiesel equiv.' },
    ],
  },
  {
    id: 'RFQ-0417', subject: 'POS terminal replacement (1 unit)', dateSent: '22 Apr', dueDate: '29 Apr', linkedPR: 'PR-2085',
    quotes: [
      { vendor: 'TechStop Ghana', amount: 4200, leadTime: 3, paymentTerms: 'Net 30', notes: 'HP rp9 · refurbished' },
      { vendor: 'Persol Systems', amount: 5400, leadTime: 7, paymentTerms: 'Net 30', notes: 'New unit · 3yr warranty' },
      { vendor: 'IT West Africa', amount: 4600, leadTime: 5, paymentTerms: 'Net 14', notes: 'New unit · 1yr warranty' },
    ],
  },
];

// All POs (broader than GM view — full lifecycle)
const POS = [
  { id: 'PO-1142', vendor: 'Tema Linen Supply', subject: 'Linen replacement (12 sets + 8 bathrobes)', amount: 3200, status: 'awaiting-approval', dateRaised: '24 Apr', expectedDelivery: '02 May', linkedPR: 'PR-2091' },
  { id: 'PO-1141', vendor: 'Akosombo Fresh Market', subject: 'Weekend produce + wine top-up', amount: 8400, status: 'awaiting-approval', dateRaised: '25 Apr', expectedDelivery: '25 Apr (today)', linkedPR: 'PR-2089' },
  { id: 'PO-1140', vendor: 'Akwaaba Pools', subject: 'Pool pump replacement (Hayward 1.5HP)', amount: 5800, status: 'awaiting-approval', dateRaised: '23 Apr', expectedDelivery: '28 Apr', linkedPR: 'PR-2088' },
  { id: 'PO-1138', vendor: 'Akosombo Fresh Market', subject: 'Daily kitchen produce · Week 17', amount: 6200, status: 'in-transit', dateRaised: '22 Apr', expectedDelivery: '25 Apr (today)', linkedPR: null },
  { id: 'PO-1135', vendor: 'Volta Vintners', subject: 'Q2 wine restock', amount: 18400, status: 'delivered', dateRaised: '15 Apr', expectedDelivery: '22 Apr', deliveredOn: '22 Apr', linkedPR: 'PR-2078' },
  { id: 'PO-1132', vendor: 'Akosombo Fresh Market', subject: 'Daily produce · Week 16', amount: 5840, status: 'delivered-with-notes', dateRaised: '15 Apr', expectedDelivery: '22 Apr', deliveredOn: '22 Apr', linkedPR: null, notes: '2 fish under-supplied · credit note received' },
  { id: 'PO-1130', vendor: 'Volta Cooling Ltd', subject: 'Quarterly chiller service', amount: 4800, status: 'delivered', dateRaised: '10 Feb', expectedDelivery: '15 Feb', deliveredOn: '15 Feb', linkedPR: 'PR-2061' },
  { id: 'PO-1128', vendor: 'Tema Linen Supply', subject: 'Bath linens · early Apr restock', amount: 2400, status: 'delivered', dateRaised: '02 Apr', expectedDelivery: '08 Apr', deliveredOn: '08 Apr', linkedPR: 'PR-2071' },
];

// Recent GRNs
const GRNS = [
  { id: 'GRN-2026-0142', po: 'PO-1138', vendor: 'Akosombo Fresh Market', received: '25 Apr 06:40', receivedBy: 'Chef Olamide', status: 'received-ok', value: 6200, items: 8 },
  { id: 'GRN-2026-0141', po: 'PO-1135', vendor: 'Volta Vintners', received: '22 Apr 14:20', receivedBy: 'Yaa Owusu', status: 'received-ok', value: 18400, items: 24 },
  { id: 'GRN-2026-0140', po: 'PO-1132', vendor: 'Akosombo Fresh Market', received: '22 Apr 06:50', receivedBy: 'Chef Olamide', status: 'received-discrepancy', value: 5840, items: 8, note: '2 fish under-supplied · credit note received' },
  { id: 'GRN-2026-0139', po: 'PO-1128', vendor: 'Tema Linen Supply', received: '08 Apr 11:00', receivedBy: 'Akua Mensah', status: 'received-ok', value: 2400, items: 4 },
  { id: 'GRN-2026-0138', po: 'PO-1130', vendor: 'Volta Cooling Ltd', received: '15 Feb 10:00', receivedBy: 'Sipho Dube', status: 'received-ok', value: 4800, items: 1 },
];

// Vendor master
const VENDORS = [
  { id: 'SUP-001', name: 'Akosombo Fresh Market', category: 'F&B · Produce', contact: 'Kwame Adusei', phone: '+233 244 553 0012', email: 'kwame@akosombofresh.gh', terms: 'Net 14', taxId: 'GH-VAT-2018-4421', preferred: true, contractEnd: '31 Dec 2026', ytdSpend: 184200, openPOs: 1 },
  { id: 'SUP-002', name: 'Volta Vintners', category: 'F&B · Beverages', contact: 'Selasi Kotoka', phone: '+233 244 891 7720', email: 'orders@voltavintners.com', terms: 'Net 30', taxId: 'GH-VAT-2019-2234', preferred: true, contractEnd: '15 Jun 2026', ytdSpend: 142400, openPOs: 1 },
  { id: 'SUP-003', name: 'Akwaaba Pools', category: 'Maintenance · Pool', contact: 'Daniel Frimpong', phone: '+233 302 887 2210', email: 'service@akwaabapools.com', terms: 'Net 30', taxId: 'GH-VAT-2017-9981', preferred: true, contractEnd: '01 Mar 2027', ytdSpend: 28400, openPOs: 1 },
  { id: 'SUP-004', name: 'Tema Linen Supply', category: 'Housekeeping · Linen', contact: 'Patience Ofori', phone: '+233 244 661 8240', email: 'patience@temalinen.com', terms: 'Net 14', taxId: 'GH-VAT-2020-1142', preferred: true, contractEnd: '31 Dec 2026', ytdSpend: 38600, openPOs: 1 },
  { id: 'SUP-005', name: 'Volta Cooling Ltd', category: 'Maintenance · HVAC', contact: 'Joseph Anokye', phone: '+233 244 220 5510', email: 'service@voltacooling.gh', terms: 'Net 30', taxId: 'GH-VAT-2018-7740', preferred: true, contractEnd: '30 Jun 2026', ytdSpend: 62800, openPOs: 0 },
  { id: 'SUP-006', name: 'Power Solutions GH', category: 'Maintenance · Generator', contact: 'Eric Osei', phone: '+233 302 770 4400', email: 'service@powersolutions.gh', terms: 'Net 30', taxId: 'GH-VAT-2019-4421', preferred: true, contractEnd: '15 Sep 2026', ytdSpend: 48200, openPOs: 0 },
  { id: 'SUP-007', name: 'Ghana Cleaning Co.', category: 'Housekeeping · Supplies', contact: 'Mavis Osei', phone: '+233 244 998 1120', email: 'orders@ghanacleaning.com', terms: 'Net 14', taxId: 'GH-VAT-2021-2210', preferred: false, contractEnd: null, ytdSpend: 21800, openPOs: 0 },
  { id: 'SUP-008', name: 'Coastal Seafoods', category: 'F&B · Seafood', contact: 'Kofi Mensah', phone: '+233 244 112 4480', email: '—', terms: 'COD', taxId: 'Sole-trader · TIN-2240088', preferred: true, contractEnd: 'Verbal', ytdSpend: 32400, openPOs: 0, note: 'Direct-from-fisherman · 8% saving vs market' },
  { id: 'SUP-009', name: 'Kente Hospitality Wares', category: 'F&B · Tableware', contact: 'Akosua Boateng', phone: '+233 302 660 1100', email: 'sales@kentehospitality.com', terms: 'Net 30', taxId: 'GH-VAT-2020-8814', preferred: false, contractEnd: null, ytdSpend: 12400, openPOs: 0 },
  { id: 'SUP-010', name: 'Solar Taxi GH', category: 'Maintenance · Solar', contact: 'Jorge Appiah', phone: '+233 244 884 2100', email: 'support@solartaxi.com', terms: 'Net 30', taxId: 'GH-VAT-2022-1142', preferred: true, contractEnd: '12 Sep 2030', ytdSpend: 18400, openPOs: 0 },
];

// Vendor performance scores — 12-month rolling
const VENDOR_PERFORMANCE = [
  { vendorId: 'SUP-001', name: 'Akosombo Fresh Market', orders: 84, onTimePct: 96, fillRate: 94, qualityScore: 4.8, avgLeadTime: 2, disputedDeliveries: 2, totalSpend: 184200 },
  { vendorId: 'SUP-002', name: 'Volta Vintners', orders: 8, onTimePct: 100, fillRate: 100, qualityScore: 4.6, avgLeadTime: 7, disputedDeliveries: 0, totalSpend: 142400 },
  { vendorId: 'SUP-003', name: 'Akwaaba Pools', orders: 4, onTimePct: 75, fillRate: 100, qualityScore: 4.7, avgLeadTime: 4, disputedDeliveries: 0, totalSpend: 28400 },
  { vendorId: 'SUP-004', name: 'Tema Linen Supply', orders: 6, onTimePct: 83, fillRate: 92, qualityScore: 4.5, avgLeadTime: 8, disputedDeliveries: 1, totalSpend: 38600 },
  { vendorId: 'SUP-005', name: 'Volta Cooling Ltd', orders: 4, onTimePct: 100, fillRate: 100, qualityScore: 4.9, avgLeadTime: 5, disputedDeliveries: 0, totalSpend: 62800 },
  { vendorId: 'SUP-006', name: 'Power Solutions GH', orders: 3, onTimePct: 100, fillRate: 100, qualityScore: 4.7, avgLeadTime: 6, disputedDeliveries: 0, totalSpend: 48200 },
  { vendorId: 'SUP-008', name: 'Coastal Seafoods', orders: 24, onTimePct: 100, fillRate: 96, qualityScore: 4.9, avgLeadTime: 1, disputedDeliveries: 1, totalSpend: 32400 },
];

// Slow-moving / expiring stock
const STOCK_ALERTS = [
  { sku: 'BEV-006', name: 'Champagne (split)', category: 'Bar', current: 14, par: 20, lastSold: '14 days ago', velocity: 'slow', value: 3920, action: 'Promotion or reduce par' },
  { sku: 'KIT-018', name: 'Heavy cream', category: 'Kitchen', current: 4, par: 8, lastSold: '6 days ago · 0.5L expired', velocity: 'expiring', value: 128, action: 'Reduce ordering frequency' },
  { sku: 'KIT-011', name: 'Hibiscus syrup', category: 'Bar Mixers', current: 4, par: 12, lastSold: '2 days ago', velocity: 'critical-low', value: 240, action: 'Reorder now' },
  { sku: 'BEV-007', name: 'Premium reserve red', category: 'Bar', current: 6, par: 8, lastSold: '21 days ago', velocity: 'slow', value: 1740, action: 'Sommelier review' },
  { sku: 'KIT-007', name: 'Cooking oil (palm)', category: 'Kitchen', current: 8, par: 20, lastSold: 'used daily', velocity: 'critical-low', value: 240, action: 'Reorder now' },
];

// Helper
const totalQuoteCount = (rfq) => rfq.quotes.length;
const cheapestQuote = (rfq) => rfq.quotes.reduce((min, q) => q.amount < min.amount ? q : min);
const fastestQuote = (rfq) => rfq.quotes.reduce((min, q) => q.leadTime < min.leadTime ? q : min);


// ============================================================================
// PURCHASING DASHBOARD
// ============================================================================
const PMDashboard = ({ setActiveNav }) => {
  const openPRs = PRS.filter(p => p.status === 'awaiting-rfq').length;
  const activeRFQs = RFQS.length;
  const pendingPOs = POS.filter(p => p.status === 'awaiting-approval').length;
  const inTransit = POS.filter(p => p.status === 'in-transit').length;
  const totalOpenValue = POS.filter(p => p.status === 'awaiting-approval' || p.status === 'in-transit').reduce((s, p) => s + p.amount, 0);
  const ytdSpend = VENDORS.reduce((s, v) => s + v.ytdSpend, 0);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Procurement · Operations</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Good morning, Kojo</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{openPRs} PRs awaiting RFQ · {activeRFQs} RFQs in flight · {pendingPOs} POs at GM</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Download}>Period Report</Btn>
            <Btn variant="primary" icon={ArrowRight} onClick={() => setActiveNav('pm-prs')}>Open PR Queue</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        {/* Pipeline KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <KpiTile label="Open PRs" value={openPRs} sublabel="awaiting RFQ" icon={FileText} tone={theme.gold} />
          <KpiTile label="Active RFQs" value={activeRFQs} sublabel="comparing quotes" icon={BarChart3} tone={theme.teal} />
          <KpiTile label="POs at GM" value={pendingPOs} sublabel={cedi(POS.filter(p => p.status === 'awaiting-approval').reduce((s, p) => s + p.amount, 0)) + ' for approval'} icon={ClipboardList} tone={theme.dusk} />
          <KpiTile label="In Transit" value={inTransit} sublabel="awaiting GRN" icon={Truck} tone={theme.gold} />
          <KpiTile label="YTD Spend" value={cedi(ytdSpend)} sublabel={`${VENDORS.length} active vendors`} icon={DollarSign} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="My Queue · Next Actions" accent={theme.gold} padded={false}>
            <div className="divide-y" style={{ borderColor: theme.ruleSoft }}>
              <div className="p-4 flex items-start gap-3" style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: theme.claySoft, color: theme.clay }}><AlertTriangle size={14} /></div>
                <div className="flex-1">
                  <div className="text-sm" style={{ color: theme.ink, fontWeight: 600 }}>PR-2092 · Chef's emergency produce</div>
                  <div className="text-xs mt-0.5" style={{ color: theme.inkSoft }}>Lake prawns + hibiscus + tomato · ₵1,980 · marked HIGH urgency · needed tonight</div>
                </div>
                <Btn variant="primary" size="sm" icon={ArrowRight} onClick={() => setActiveNav('pm-prs')}>Process</Btn>
              </div>
              <div className="p-4 flex items-start gap-3" style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: theme.goldSoft, color: theme.gold }}><BarChart3 size={14} /></div>
                <div className="flex-1">
                  <div className="text-sm" style={{ color: theme.ink, fontWeight: 600 }}>RFQ-0418 · Stemware quotes received</div>
                  <div className="text-xs mt-0.5" style={{ color: theme.inkSoft }}>3 quotes back · range ₵1,620–₵2,240 · pick winner today</div>
                </div>
                <Btn variant="secondary" size="sm" icon={ArrowRight} onClick={() => setActiveNav('pm-rfqs')}>Compare</Btn>
              </div>
              <div className="p-4 flex items-start gap-3" style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: theme.duskSoft, color: theme.dusk }}><Truck size={14} /></div>
                <div className="flex-1">
                  <div className="text-sm" style={{ color: theme.ink, fontWeight: 600 }}>PO-1138 · GRN expected today</div>
                  <div className="text-xs mt-0.5" style={{ color: theme.inkSoft }}>Akosombo Fresh · daily produce · arriving 06:30 · standby for Chef receipt sign-off</div>
                </div>
                <Btn variant="ghost" size="sm" icon={Eye} onClick={() => setActiveNav('pm-grns')}>Track</Btn>
              </div>
              <div className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: theme.tealSoft, color: theme.teal }}><Activity size={14} /></div>
                <div className="flex-1">
                  <div className="text-sm" style={{ color: theme.ink, fontWeight: 600 }}>Akwaaba Pools · on-time slipping</div>
                  <div className="text-xs mt-0.5" style={{ color: theme.inkSoft }}>75% on-time vs 95%+ target · review with vendor at next pool service</div>
                </div>
                <Btn variant="ghost" size="sm" icon={ArrowRight} onClick={() => setActiveNav('pm-performance')}>Review</Btn>
              </div>
            </div>
          </Card>

          <Card title="Spend by Category · YTD" accent={theme.teal}>
            <div className="space-y-3">
              {(() => {
                const byCategory = VENDORS.reduce((acc, v) => {
                  const cat = v.category.split(' · ')[0];
                  acc[cat] = (acc[cat] || 0) + v.ytdSpend;
                  return acc;
                }, {});
                const sorted = Object.entries(byCategory).sort(([, a], [, b]) => b - a);
                const max = sorted[0][1];
                return sorted.map(([cat, spend]) => {
                  const pctOfMax = (spend / max) * 100;
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span style={{ color: theme.ink, fontWeight: 500 }}>{cat}</span>
                        <span className="font-mono" style={{ color: theme.ink }}>{cedi(spend)}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden" style={{ background: theme.ruleSoft }}>
                        <div className="h-full" style={{ width: `${pctOfMax}%`, background: theme.gold }} />
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </Card>
        </div>

        <Card title="Open Pipeline · By Stage" accent={theme.dusk} padded={false}>
          <div className="grid grid-cols-4">
            {[
              { stage: 'PRs · Awaiting RFQ', count: openPRs, value: PRS.filter(p => p.status === 'awaiting-rfq').reduce((s, p) => s + p.estimate, 0), color: theme.gold },
              { stage: 'RFQs · In Progress', count: activeRFQs, value: RFQS.reduce((s, r) => s + cheapestQuote(r).amount, 0), color: theme.teal },
              { stage: 'POs · GM Approval', count: pendingPOs, value: POS.filter(p => p.status === 'awaiting-approval').reduce((s, p) => s + p.amount, 0), color: theme.dusk },
              { stage: 'POs · In Transit', count: inTransit, value: POS.filter(p => p.status === 'in-transit').reduce((s, p) => s + p.amount, 0), color: theme.gold },
            ].map((s, i, arr) => (
              <div key={s.stage} className="p-5" style={{ borderRight: i < arr.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                <div className="text-[10px] uppercase mb-2" style={{ color: s.color, letterSpacing: '0.16em', fontWeight: 700 }}>{s.stage}</div>
                <div className="font-serif" style={{ fontSize: '32px', color: theme.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.count}</div>
                <div className="text-sm mt-2" style={{ color: theme.inkSoft }}>{cedi(s.value)} estimated</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// PURCHASE REQUISITIONS
// ============================================================================
const PRsModule = () => {
  const [filter, setFilter] = useState('awaiting-rfq');
  const filtered = PRS.filter(p => filter === 'all' || p.status === filter);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Demand · Intake</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Purchase Requisitions</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Department requests waiting to be turned into RFQs or direct POs</div>
          </div>
          <Btn variant="primary" icon={Plus}>Raise PR for Department</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="flex items-center gap-2 p-3" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
          <span className="text-[10px] uppercase mr-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'awaiting-rfq', label: 'Awaiting RFQ' },
            { id: 'po-issued', label: 'PO Issued' },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} className="text-xs px-3 py-1.5"
              style={{ background: filter === f.id ? theme.ink : 'transparent', color: filter === f.id ? theme.bgPanel : theme.inkSoft, border: `1px solid ${filter === f.id ? theme.ink : theme.rule}`, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {f.label}
            </button>
          ))}
          <div className="flex-1" />
          <span className="text-xs" style={{ color: theme.inkMute }}>{filtered.length} of {PRS.length}</span>
        </div>

        <Card title="Purchase Requisitions" accent={theme.gold} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>PR</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Department · Requester</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Items</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Estimate</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Urgency</th>
                <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const tone = p.urgency === 'high' ? 'clay' : p.urgency === 'normal' ? 'teal' : 'neutral';
                return (
                  <tr key={p.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none', opacity: p.status === 'po-issued' ? 0.55 : 1 }}>
                    <td className="py-3 px-5">
                      <div className="font-mono text-xs" style={{ color: theme.ink, fontWeight: 500 }}>{p.id}</div>
                      <div className="text-[10px]" style={{ color: theme.inkMute }}>{p.dateRaised}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div style={{ color: theme.ink, fontWeight: 500 }}>{p.dept}</div>
                      <div className="text-[10px]" style={{ color: theme.inkMute }}>{p.requester}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-xs" style={{ color: theme.ink }}>{p.items}</div>
                      {p.notes && <div className="text-[10px] italic mt-0.5" style={{ color: theme.inkSoft }}>{p.notes}</div>}
                    </td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{cedi(p.estimate)}</td>
                    <td className="py-3 px-3"><Pill tone={tone} size="sm">{p.urgency}</Pill></td>
                    <td className="py-3 px-5 text-right">
                      {p.status === 'awaiting-rfq'
                        ? (
                          <div className="flex justify-end gap-1">
                            <Btn variant="ghost" size="sm" icon={Send}>Send RFQ</Btn>
                            <Btn variant="primary" size="sm" icon={FileSignature}>Direct PO</Btn>
                          </div>
                        )
                        : <Pill tone="leaf" size="sm"><Check size={9} /> {p.status}</Pill>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};


// ============================================================================
// RFQ COMPARISON
// ============================================================================
const RFQsModule = () => {
  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Quotation Comparison</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>RFQ Comparison</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{RFQS.length} active RFQs · pick a winning quote and convert to PO</div>
          </div>
          <Btn variant="primary" icon={Plus}>New RFQ</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        {RFQS.map(rfq => {
          const cheapest = cheapestQuote(rfq);
          const fastest = fastestQuote(rfq);
          return (
            <Card key={rfq.id} title={`${rfq.id} · ${rfq.subject}`} accent={theme.teal} padded={false}
              action={
                <div className="flex items-center gap-3 text-xs" style={{ color: theme.inkSoft }}>
                  <span>Sent {rfq.dateSent}</span>
                  <span>Due {rfq.dueDate}</span>
                  {rfq.linkedPR && <Pill tone="dusk" size="sm">From {rfq.linkedPR}</Pill>}
                </div>
              }>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                    <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Vendor</th>
                    <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Quote</th>
                    <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Lead Time</th>
                    <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Terms</th>
                    <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Notes</th>
                    <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rfq.quotes.map((q, i) => {
                    const isCheapest = q.amount === cheapest.amount;
                    const isFastest = q.leadTime === fastest.leadTime;
                    return (
                      <tr key={q.vendor} style={{ borderBottom: i < rfq.quotes.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                        <td className="py-3 px-5">
                          <div className="flex items-center gap-2">
                            <span style={{ color: theme.ink, fontWeight: 500 }}>{q.vendor}</span>
                            {isCheapest && <Pill tone="leaf" size="sm">Cheapest</Pill>}
                            {isFastest && !isCheapest && <Pill tone="teal" size="sm">Fastest</Pill>}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="font-mono" style={{ color: isCheapest ? theme.leaf : theme.ink, fontWeight: 700, fontSize: '15px' }}>{cedi(q.amount)}</div>
                          {!isCheapest && <div className="text-[10px]" style={{ color: theme.clay }}>+{cedi(q.amount - cheapest.amount)}</div>}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="font-mono" style={{ color: isFastest ? theme.teal : theme.ink, fontWeight: 600 }}>{q.leadTime}d</div>
                          {!isFastest && <div className="text-[10px]" style={{ color: theme.inkMute }}>+{q.leadTime - fastest.leadTime}d slower</div>}
                        </td>
                        <td className="py-3 px-3"><Pill tone="neutral" size="sm">{q.paymentTerms}</Pill></td>
                        <td className="py-3 px-3 text-xs italic" style={{ color: theme.inkSoft }}>{q.notes}</td>
                        <td className="py-3 px-5 text-right">
                          <Btn variant={isCheapest ? 'primary' : 'ghost'} size="sm" icon={isCheapest ? Check : null}>
                            {isCheapest ? 'Award' : 'Award'}
                          </Btn>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="px-5 py-3 flex items-start gap-2 text-xs" style={{ background: theme.bgPanelAlt, borderTop: `1px solid ${theme.ruleSoft}` }}>
                <Sparkles size={12} style={{ color: theme.gold, marginTop: 2 }} />
                <div style={{ color: theme.inkSoft }}>
                  <span style={{ color: theme.ink, fontWeight: 600 }}>Recommendation: </span>
                  {rfq.id === 'RFQ-0418' ? 'Cheapest is Accra Glassware (₵1,620) but lead time of 14 days is long. Kente Hospitality at ₵1,840 with 7-day lead time balances cost and speed best — pre-existing vendor relationship.' :
                   'TechStop Ghana cheapest at ₵4,200 and fastest at 3 days — but refurbished hardware is risky for FO terminal. Persol at ₵5,400 with 3yr warranty is the safer call.'}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// PURCHASE ORDERS
// ============================================================================
const POsModule = () => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? POS : POS.filter(p => p.status === filter);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>POs · Lifecycle</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Purchase Orders</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{POS.length} POs in current view · drag PRs to drafts or convert directly</div>
          </div>
          <Btn variant="primary" icon={Plus}>New PO</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="flex items-center gap-2 p-3 flex-wrap" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
          <span className="text-[10px] uppercase mr-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</span>
          {['all', 'awaiting-approval', 'in-transit', 'delivered', 'delivered-with-notes'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className="text-xs px-3 py-1.5"
              style={{ background: filter === f ? theme.ink : 'transparent', color: filter === f ? theme.bgPanel : theme.inkSoft, border: `1px solid ${filter === f ? theme.ink : theme.rule}`, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {f === 'all' ? 'All' : f.replace(/-/g, ' ')}
            </button>
          ))}
          <div className="flex-1" />
          <span className="text-xs" style={{ color: theme.inkMute }}>{filtered.length} of {POS.length}</span>
        </div>

        <Card title="Purchase Orders" accent={theme.dusk} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>PO</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Vendor · Subject</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Amount</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Linked PR</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Delivery</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const tone = p.status === 'delivered' ? 'leaf' : p.status === 'in-transit' ? 'teal' : p.status === 'awaiting-approval' ? 'gold' : 'clay';
                return (
                  <tr key={p.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none', opacity: p.status === 'delivered' ? 0.65 : 1 }}>
                    <td className="py-3 px-5">
                      <div className="font-mono text-xs" style={{ color: theme.ink, fontWeight: 500 }}>{p.id}</div>
                      <div className="text-[10px]" style={{ color: theme.inkMute }}>{p.dateRaised}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div style={{ color: theme.ink, fontWeight: 500 }}>{p.subject}</div>
                      <div className="text-[10px]" style={{ color: theme.inkMute }}>{p.vendor}</div>
                      {p.notes && <div className="text-[10px] italic mt-0.5" style={{ color: theme.gold }}>{p.notes}</div>}
                    </td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{cedi(p.amount)}</td>
                    <td className="py-3 px-3 font-mono text-xs" style={{ color: theme.inkSoft }}>{p.linkedPR || '—'}</td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>
                      {p.deliveredOn ? `Delivered ${p.deliveredOn}` : `Expected ${p.expectedDelivery}`}
                    </td>
                    <td className="py-3 px-5"><Pill tone={tone} size="sm">{p.status.replace(/-/g, ' ')}</Pill></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// GOODS RECEIVED
// ============================================================================
const GRNsModule = () => {
  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Receiving</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Goods Received Notes</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Track deliveries · resolve discrepancies · feed three-way match in AP</div>
          </div>
          <Btn variant="primary" icon={Plus}>Record Receipt</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiTile label="Expected Today" value={POS.filter(p => p.status === 'in-transit').length} sublabel="awaiting GRN" icon={Truck} tone={theme.teal} />
          <KpiTile label="Received This Week" value={GRNS.filter(g => !g.received.includes('Feb')).length} sublabel={`${GRNS.filter(g => g.status === 'received-ok').length} clean`} icon={CircleCheck} tone={theme.leaf} />
          <KpiTile label="Discrepancies · MTD" value={GRNS.filter(g => g.status === 'received-discrepancy').length} sublabel="credit notes received" icon={AlertTriangle} tone={theme.gold} />
        </div>

        <Card title="Recent GRNs" accent={theme.leaf} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>GRN</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Vendor · PO</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Received</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>By</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Items / Value</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {GRNS.map((g, i) => (
                <tr key={g.id} style={{ borderBottom: i < GRNS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5 font-mono text-xs" style={{ color: theme.ink, fontWeight: 500 }}>{g.id}</td>
                  <td className="py-3 px-3">
                    <div style={{ color: theme.ink, fontWeight: 500 }}>{g.vendor}</div>
                    <div className="font-mono text-[10px]" style={{ color: theme.inkMute }}>{g.po}</div>
                  </td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{g.received}</td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{g.receivedBy}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="font-mono text-xs" style={{ color: theme.inkSoft }}>{g.items} item{g.items !== 1 ? 's' : ''}</div>
                    <div className="font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{cedi(g.value)}</div>
                  </td>
                  <td className="py-3 px-5">
                    {g.status === 'received-ok'
                      ? <Pill tone="leaf" size="sm"><Check size={9} /> OK</Pill>
                      : <Pill tone="gold" size="sm"><AlertTriangle size={9} /> Discrepancy</Pill>}
                    {g.note && <div className="text-[10px] mt-0.5 italic" style={{ color: theme.inkSoft }}>{g.note}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// VENDOR DIRECTORY
// ============================================================================
const VendorsModule = () => {
  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Master Data</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Vendor Directory</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{VENDORS.length} active vendors · {VENDORS.filter(v => v.preferred).length} preferred · contracts up to 2030</div>
          </div>
          <Btn variant="primary" icon={Plus}>Onboard Vendor</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <Card title="Vendor Master" accent={theme.teal} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Vendor</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Category</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Contact</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Tax ID</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Terms</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Contract</th>
                <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>YTD Spend</th>
              </tr>
            </thead>
            <tbody>
              {VENDORS.map((v, i) => (
                <tr key={v.id} style={{ borderBottom: i < VENDORS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-2">
                      <span style={{ color: theme.ink, fontWeight: 500 }}>{v.name}</span>
                      {v.preferred && <Star size={11} fill={theme.gold} style={{ color: theme.gold }} />}
                    </div>
                    <div className="font-mono text-[10px]" style={{ color: theme.inkMute }}>{v.id}</div>
                    {v.note && <div className="text-[10px] italic mt-0.5" style={{ color: theme.leaf }}>{v.note}</div>}
                  </td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{v.category}</td>
                  <td className="py-3 px-3 text-xs">
                    <div style={{ color: theme.ink }}>{v.contact}</div>
                    <div style={{ color: theme.inkMute }}>{v.phone}</div>
                  </td>
                  <td className="py-3 px-3 font-mono text-[10px]" style={{ color: theme.inkSoft }}>{v.taxId}</td>
                  <td className="py-3 px-3"><Pill tone="neutral" size="sm">{v.terms}</Pill></td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{v.contractEnd || '—'}</td>
                  <td className="py-3 px-5 text-right font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{cedi(v.ytdSpend)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// VENDOR PERFORMANCE
// ============================================================================
const PerformanceModule = () => {
  const sorted = [...VENDOR_PERFORMANCE].sort((a, b) => b.qualityScore - a.qualityScore);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Vendor Scorecards</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Vendor Performance</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Rolling 12-month scorecards · on-time delivery · fill rate · quality</div>
          </div>
          <Btn variant="secondary" icon={Download}>Export Scorecards</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <Card title="12-Month Performance Scorecards" accent={theme.gold} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Vendor</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Orders</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>On-Time %</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Fill Rate %</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Quality / 5</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Avg Lead</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Disputes</th>
                <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>YTD Spend</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((v, i) => {
                const otOff = v.onTimePct < 90;
                const frOff = v.fillRate < 95;
                return (
                  <tr key={v.vendorId} style={{ borderBottom: i < sorted.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5">
                      <div style={{ color: theme.ink, fontWeight: 500 }}>{v.name}</div>
                      <div className="font-mono text-[10px]" style={{ color: theme.inkMute }}>{v.vendorId}</div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.inkSoft }}>{v.orders}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="font-mono" style={{ color: otOff ? theme.clay : theme.leaf, fontWeight: 600 }}>{v.onTimePct}%</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="font-mono" style={{ color: frOff ? theme.clay : theme.leaf, fontWeight: 600 }}>{v.fillRate}%</span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="font-serif" style={{ fontSize: '15px', color: v.qualityScore >= 4.8 ? theme.gold : theme.ink, fontWeight: 600, letterSpacing: '-0.01em' }}>{v.qualityScore.toFixed(1)}</span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.inkSoft }}>{v.avgLeadTime}d</td>
                    <td className="py-3 px-3 text-right">
                      <span className="font-mono" style={{ color: v.disputedDeliveries === 0 ? theme.leaf : theme.gold, fontWeight: 600 }}>{v.disputedDeliveries}</span>
                    </td>
                    <td className="py-3 px-5 text-right font-mono" style={{ color: theme.ink }}>{cedi(v.totalSpend)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.leaf}` }}>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.leaf, letterSpacing: '0.16em', fontWeight: 700 }}>Top Performer</div>
            <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>Volta Cooling Ltd</div>
            <p className="text-sm mt-2" style={{ color: theme.inkSoft }}>4.9/5 quality · 100% on-time · 100% fill rate · 0 disputes across 4 service calls. Renew chiller maintenance contract before 30 Jun expiry.</p>
          </div>
          <div className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.gold}` }}>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.16em', fontWeight: 700 }}>Needs Conversation</div>
            <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>Akwaaba Pools</div>
            <p className="text-sm mt-2" style={{ color: theme.inkSoft }}>75% on-time vs 95%+ target. Quality is fine (4.7/5). Discuss SLA at next service visit — also their pump quote is on PO-1140.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// STOCK MOVEMENTS / SLOW-MOVING
// ============================================================================
const StockModule = () => {
  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Inventory Health</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Stock Movements</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Slow-moving items · expiring stock · reorder critical · velocity analysis</div>
          </div>
          <Btn variant="primary" icon={Plus}>Stock Adjustment</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiTile label="Slow-Moving" value={STOCK_ALERTS.filter(s => s.velocity === 'slow').length} sublabel="needs sommelier/menu review" icon={Clock3} tone={theme.gold} />
          <KpiTile label="Critical Low" value={STOCK_ALERTS.filter(s => s.velocity === 'critical-low').length} sublabel="reorder immediately" icon={AlertTriangle} tone={theme.clay} />
          <KpiTile label="Expiring" value={STOCK_ALERTS.filter(s => s.velocity === 'expiring').length} sublabel="within shelf life window" icon={Clock} tone={theme.dusk} />
        </div>

        <Card title="Stock Alerts · Action Required" accent={theme.clay} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>SKU · Item</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Category</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>On Hand · Par</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Last Sold</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Value</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Velocity</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              {STOCK_ALERTS.map((s, i) => {
                const tone = s.velocity === 'critical-low' ? 'clay' : s.velocity === 'slow' ? 'gold' : 'dusk';
                return (
                  <tr key={s.sku} style={{ borderBottom: i < STOCK_ALERTS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5">
                      <div style={{ color: theme.ink, fontWeight: 500 }}>{s.name}</div>
                      <div className="font-mono text-[10px]" style={{ color: theme.inkMute }}>{s.sku}</div>
                    </td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{s.category}</td>
                    <td className="py-3 px-3 text-right font-mono text-xs" style={{ color: theme.ink }}>{s.current} / {s.par}</td>
                    <td className="py-3 px-3 text-xs italic" style={{ color: theme.inkSoft }}>{s.lastSold}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(s.value)}</td>
                    <td className="py-3 px-3"><Pill tone={tone} size="sm">{s.velocity.replace(/-/g, ' ')}</Pill></td>
                    <td className="py-3 px-5 text-xs italic" style={{ color: theme.gold }}>{s.action}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// COMING SOON
// ============================================================================
const PmComingSoon = ({ title }) => (
  <div className="p-4 md:p-6" style={{ background: theme.bg, minHeight: '100%' }}>
    <SectionHeader overline="Module" title={title} />
    <div className="p-12 text-center" style={{ background: theme.bgPanel, border: `1px dashed ${theme.rule}` }}>
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ background: theme.tealSoft, color: theme.teal }}><Sparkles size={20} /></div>
      <p className="font-serif text-lg mb-2" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Module defined in the BRD</p>
      <p className="text-sm" style={{ color: theme.inkSoft }}>To be built in the next sprint.</p>
    </div>
  </div>
);

// ============================================================================
// APP
// ============================================================================
const PmApp = () => {
  const [activeNav, setActiveNav] = useState('pm-dashboard');
  let content;
  if (activeNav === 'pm-dashboard') content = <PMDashboard setActiveNav={setActiveNav} />;
  else if (activeNav === 'pm-prs') content = <PRsModule />;
  else if (activeNav === 'pm-rfqs') content = <RFQsModule />;
  else if (activeNav === 'pm-pos') content = <POsModule />;
  else if (activeNav === 'pm-grns') content = <GRNsModule />;
  else if (activeNav === 'pm-vendors') content = <VendorsModule />;
  else if (activeNav === 'pm-performance') content = <PerformanceModule />;
  else if (activeNav === 'pm-stock') content = <StockModule />;
  else content = <PmComingSoon title="Module" />;

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: theme.bg, fontFamily: '"Inter", system-ui, sans-serif', color: theme.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.rule}; }
      `}</style>
      <PmSidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <PmTopBar />
        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
};



// ============================================================================
// IT MANAGER · Kobi Anane
// ============================================================================
const IT_NAV = [
  { id: 'it-health', label: 'System Health', icon: Activity },
  { id: 'it-users', label: 'Users & Roles', icon: Users },
  { id: 'it-audit', label: 'Audit Log', icon: ClipboardList },
  { id: 'it-integrations', label: 'Integrations', icon: Globe },
  { id: 'it-backups', label: 'Backups', icon: RefreshCw },
  { id: 'it-license', label: 'License & Updates', icon: Key },
  { id: 'it-api', label: 'API & Webhooks', icon: Send },
  { id: 'it-config', label: 'Configuration', icon: Settings },
];

const it_ME = { initials: 'KA', name: 'Kobi Anane', role: 'IT Manager' };

// ============================================================================
// SIDEBAR
// ============================================================================
const ItSidebar = ({ activeNav, setActiveNav }) => (
  <aside className="hidden md:flex w-64 flex-shrink-0 flex-col" style={{ background: theme.navBg, color: '#FBF7EE' }}>
    <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <FloatLogo size="md" />
          <div className="text-[10px] mt-1" style={{ color: theme.gold, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Ghana</div>
        </div>
      </div>
    </div>
    <div className="px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium" style={{ background: theme.gold, color: theme.navBg, fontSize: '13px' }}>{it_ME.initials}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm" style={{ fontWeight: 500 }}>{it_ME.name}</div>
          <div className="text-[10px]" style={{ color: theme.gold, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>{it_ME.role}</div>
        </div>
      </div>
    </div>
    <nav className="flex-1 px-3 py-3 overflow-y-auto">
      {IT_NAV.map(item => {
        const Icon = item.icon;
        const active = activeNav === item.id;
        return (
          <button key={item.id} onClick={() => setActiveNav(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all text-sm"
            style={{ background: active ? 'rgba(185,135,64,0.15)' : 'transparent', color: active ? theme.gold : 'rgba(255,255,255,0.75)', borderLeft: active ? `3px solid ${theme.gold}` : '3px solid transparent', fontWeight: active ? 600 : 400 }}>
            <Icon size={15} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: theme.gold, color: theme.navBg, fontWeight: 700 }}>{item.badge}</span>}
          </button>
        );
      })}
    </nav>
    <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span>v1.0.4 · cloud</span>
        <button className="hover:text-white"><LogOut size={12} /></button>
      </div>
    </div>
  </aside>
);

const ItTopBar = () => (
  <div className="flex items-center justify-between pl-16 pr-4 md:px-8 py-3 md:py-4" style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
    <div className="flex items-center gap-3 text-sm" style={{ color: theme.inkSoft }}>
      <Calendar size={14} /><span className="hidden md:inline">Saturday, 25 April 2026 · All systems operational
    </span><span className="md:hidden">Sat 25 Apr</span></div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
        <Search size={13} style={{ color: theme.inkMute }} />
        <input placeholder="Search users, audit log, settings…" className="bg-transparent outline-none text-sm w-56" style={{ color: theme.ink }} />
      </div>
      <button className="relative p-2"><Bell size={15} style={{ color: theme.inkSoft }} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: theme.leaf }} /></button>
    </div>
  </div>
);

// ============================================================================
// MOCK DATA
// ============================================================================
const SYSTEM_STATUS = [
  { service: 'PMS Core', status: 'operational', uptime: 99.97, lastCheck: '06:00', responseTime: 142 },
  { service: 'Restaurant POS', status: 'operational', uptime: 99.94, lastCheck: '06:00', responseTime: 89 },
  { service: 'Channel Manager (SiteMinder)', status: 'operational', uptime: 99.81, lastCheck: '06:00', responseTime: 312 },
  { service: 'Payment Gateway (Stripe)', status: 'operational', uptime: 99.99, lastCheck: '06:00', responseTime: 184 },
  { service: 'Email Service (SendGrid)', status: 'operational', uptime: 99.96, lastCheck: '06:00', responseTime: 76 },
  { service: 'SMS Service (Twilio)', status: 'degraded', uptime: 98.42, lastCheck: '06:00', responseTime: 824, note: 'Increased latency on Ghana SMS routes since 03:00 — Twilio status page acknowledged' },
  { service: 'Door Lock System (Salto)', status: 'operational', uptime: 99.88, lastCheck: '06:00', responseTime: 218 },
  { service: 'Accounting Export (Xero)', status: 'operational', uptime: 99.92, lastCheck: '06:00', responseTime: 264 },
];

const RECENT_ERRORS = [
  { id: 'ERR-7842', timestamp: '24 Apr 14:22', service: 'SMS Service', severity: 'warning', message: 'Outbound SMS retry — 3 messages queued', resolved: true },
  { id: 'ERR-7841', timestamp: '24 Apr 03:14', service: 'Night Audit', severity: 'info', message: 'Audit completed successfully · 20 min runtime', resolved: true },
  { id: 'ERR-7840', timestamp: '23 Apr 11:48', service: 'Channel Manager', severity: 'warning', message: 'Rate push retry on Booking.com (recovered after 12s)', resolved: true },
  { id: 'ERR-7839', timestamp: '22 Apr 19:30', service: 'Payment Gateway', severity: 'warning', message: 'Card declined: insufficient funds (guest R1042)', resolved: true },
];

const PLATFORM_USERS = [
  { id: 'USR-001', name: 'Charles Botha', email: 'charles@thefloatgh.com', role: 'Managing Director', status: 'active', lastLogin: '24 Apr 18:42', mfa: true, sessions: 1 },
  { id: 'USR-002', name: 'Jana Kruger', email: 'jana.kruger@thefloatgh.com', role: 'General Manager', status: 'active', lastLogin: '25 Apr 06:08', mfa: true, sessions: 2 },
  { id: 'USR-003', name: 'Amani Mlangeni', email: 'amani@thefloatgh.com', role: 'Front Office Manager', status: 'active', lastLogin: '25 Apr 07:48', mfa: true, sessions: 1 },
  { id: 'USR-004', name: 'Yaa Owusu', email: 'yaa.owusu@thefloatgh.com', role: 'F&B Manager', status: 'active', lastLogin: '24 Apr 22:18', mfa: true, sessions: 1 },
  { id: 'USR-005', name: 'Akua Mensah', email: 'akua.mensah@thefloatgh.com', role: 'Executive Housekeeper', status: 'active', lastLogin: '25 Apr 06:55', mfa: true, sessions: 1 },
  { id: 'USR-006', name: 'Aba Forson', email: 'aba.forson@thefloatgh.com', role: 'HR Manager', status: 'active', lastLogin: '24 Apr 17:00', mfa: true, sessions: 0 },
  { id: 'USR-007', name: 'Adriaan van der Berg', email: 'adriaan@thefloatgh.com', role: 'Chief Accountant', status: 'active', lastLogin: '25 Apr 08:14', mfa: true, sessions: 1 },
  { id: 'USR-008', name: 'Chef Olamide Adeyemi', email: 'olamide@thefloatgh.com', role: 'Executive Chef', status: 'active', lastLogin: '25 Apr 14:22', mfa: false, sessions: 1 },
  { id: 'USR-009', name: 'Sipho Dube', email: 'sipho@thefloatgh.com', role: 'Maintenance Lead', status: 'active', lastLogin: '25 Apr 06:30', mfa: false, sessions: 1 },
  { id: 'USR-010', name: 'Kojo Asare', email: 'kojo@thefloatgh.com', role: 'Purchasing Manager (TBD hire)', status: 'invited', lastLogin: 'never', mfa: false, sessions: 0 },
  { id: 'USR-011', name: 'Kwame Asante', email: 'kwame@thefloatgh.com', role: 'Front Desk Agent', status: 'active', lastLogin: '24 Apr 23:48', mfa: false, sessions: 0 },
  { id: 'USR-012', name: 'Yao Mensah', email: 'yao@thefloatgh.com', role: 'Restaurant Server', status: 'active', lastLogin: '24 Apr 22:46', mfa: false, sessions: 0 },
  { id: 'USR-013', name: 'Adwoa Boateng', email: 'adwoa@thefloatgh.com', role: 'Room Attendant', status: 'active', lastLogin: '25 Apr 07:02', mfa: false, sessions: 1 },
  { id: 'USR-014', name: 'Joseph Tetteh', email: 'joseph@thefloatgh.com', role: 'Room Attendant', status: 'active', lastLogin: '25 Apr 06:58', mfa: false, sessions: 1 },
  { id: 'USR-015', name: 'Esi Owusu', email: 'esi@thefloatgh.com', role: 'Room Attendant', status: 'active', lastLogin: '25 Apr 07:05', mfa: false, sessions: 1 },
  { id: 'USR-016', name: 'Ama Sarpong', email: 'ama@thefloatgh.com', role: 'Sous Chef', status: 'suspended', lastLogin: '15 Mar 09:22', mfa: false, sessions: 0, note: 'On maternity leave through 8 Jun 2026' },
];

const AUDIT_LOG = [
  { id: 'AL-2842', timestamp: '25 Apr 08:14', user: 'Adriaan van der Berg', module: 'Finance', action: 'Posted JV-2026-0084', detail: 'Daily revenue posting · ₵187,500', severity: 'info' },
  { id: 'AL-2841', timestamp: '25 Apr 07:48', user: 'Amani Mlangeni', module: 'Front Office', action: 'Checked in guest', detail: 'Anneke Visser · Suite 305 · VIP', severity: 'info' },
  { id: 'AL-2840', timestamp: '25 Apr 06:55', user: 'Akua Mensah', module: 'Housekeeping', action: 'Updated room status', detail: 'Room 209: VD → VC', severity: 'info' },
  { id: 'AL-2839', timestamp: '25 Apr 06:08', user: 'Jana Kruger', module: 'Approvals', action: 'Approved PO-1141', detail: 'Akosombo Fresh · ₵8,400 · weekend produce', severity: 'info' },
  { id: 'AL-2838', timestamp: '25 Apr 03:02', user: 'System', module: 'Night Audit', action: 'Audit completed', detail: 'Business date advanced to 25 Apr 2026', severity: 'info' },
  { id: 'AL-2837', timestamp: '24 Apr 22:18', user: 'Yaa Owusu', module: 'F&B POS', action: 'Voided item', detail: 'Table 6 · Volta Beef Striploin · reason: kitchen mistake', severity: 'warning' },
  { id: 'AL-2836', timestamp: '24 Apr 18:42', user: 'Charles Botha', module: 'Reports', action: 'Downloaded report', detail: 'MD Performance Pack · April', severity: 'info' },
  { id: 'AL-2835', timestamp: '24 Apr 15:30', user: 'Aba Forson', module: 'HR', action: 'Approved leave', detail: 'Adwoa Boateng · 12-14 May · Compassionate', severity: 'info' },
  { id: 'AL-2834', timestamp: '24 Apr 14:22', user: 'System', module: 'Integrations', action: 'SMS retry', detail: '3 messages queued · Twilio degraded', severity: 'warning' },
  { id: 'AL-2833', timestamp: '24 Apr 11:14', user: 'Adriaan van der Berg', module: 'Finance', action: 'Period lock attempt', detail: 'March 2026 · already locked · access denied', severity: 'warning' },
  { id: 'AL-2832', timestamp: '24 Apr 09:48', user: 'unknown', module: 'Auth', action: 'Failed login', detail: 'admin@thefloatgh.com · IP 41.66.218.x · 3rd attempt', severity: 'critical', followUp: 'IP blocked at firewall · investigation closed · likely automated bot' },
  { id: 'AL-2831', timestamp: '24 Apr 08:00', user: 'Jana Kruger', module: 'Maintenance', action: 'Created work order', detail: 'WO-340 · Room 207 · AC unit not cooling', severity: 'info' },
];

const INTEGRATIONS = [
  { id: 'INT-001', name: 'SiteMinder', category: 'Channel Manager', status: 'connected', lastSync: '25 Apr 06:42', config: 'Pull every 15 min · push on rate change', endpoint: 'api.siteminder.com', version: '2024.4', notes: 'Booking.com, Expedia, Hotels.com routed via SiteMinder' },
  { id: 'INT-002', name: 'Stripe', category: 'Payment Gateway', status: 'connected', lastSync: '25 Apr 06:42', config: 'Card payments + pre-auth + saved cards', endpoint: 'api.stripe.com', version: 'v2024-04-10', notes: 'PCI compliant · 1.9% + ₵0.30 per transaction' },
  { id: 'INT-003', name: 'MTN MoMo Business', category: 'Mobile Money', status: 'connected', lastSync: '25 Apr 06:30', config: 'Inbound merchant payments', endpoint: 'api.mtn.com', version: 'v2', notes: '₵0.5% transaction fee' },
  { id: 'INT-004', name: 'Vodafone Cash', category: 'Mobile Money', status: 'connected', lastSync: '25 Apr 06:30', config: 'Inbound merchant payments', endpoint: 'api.vodafone.com', version: 'v1', notes: '₵0.5% transaction fee' },
  { id: 'INT-005', name: 'AirtelTigo Money', category: 'Mobile Money', status: 'connected', lastSync: '25 Apr 06:28', config: 'Inbound merchant payments', endpoint: 'api.airteltigo.com', version: 'v1', notes: '₵0.6% transaction fee' },
  { id: 'INT-006', name: 'SendGrid', category: 'Email Provider', status: 'connected', lastSync: '25 Apr 06:42', config: 'Transactional email · 5K/day quota', endpoint: 'api.sendgrid.com', version: 'v3', notes: 'DKIM + SPF configured · sender reputation 98/100' },
  { id: 'INT-007', name: 'Twilio', category: 'SMS Provider', status: 'degraded', lastSync: '25 Apr 06:42', config: 'Outbound SMS · Ghana routing', endpoint: 'api.twilio.com', version: '2010-04-01', notes: 'Increased latency since 03:00 · vendor incident · monitoring' },
  { id: 'INT-008', name: 'Salto KS', category: 'Door Lock', status: 'connected', lastSync: '25 Apr 06:38', config: 'Key encoding on check-in', endpoint: 'kse.saltosystems.com', version: 'v3.2', notes: '32 rooms · 6 spare cards in inventory' },
  { id: 'INT-009', name: 'Xero', category: 'Accounting Export', status: 'connected', lastSync: '25 Apr 03:15', config: 'Daily GL export after night audit', endpoint: 'api.xero.com', version: '2.0', notes: 'OAuth refresh token expires 12 May' },
  { id: 'INT-010', name: 'GHIPSS GCB Bank', category: 'Bank File', status: 'configured', lastSync: '28 Mar 2026', config: 'Payroll batch upload', endpoint: 'manual upload', version: 'CSV format v3', notes: 'Manual upload to GCB business portal · last run 28 Mar' },
];

const BACKUPS = [
  { id: 'BKP-2026-0115', timestamp: '25 Apr 02:00', type: 'Full', size: '14.2 GB', duration: '8 min', destination: 'AWS S3 · eu-west-1', status: 'success', retention: '30 days', encryption: 'AES-256' },
  { id: 'BKP-2026-0114', timestamp: '24 Apr 02:00', type: 'Full', size: '14.1 GB', duration: '8 min', destination: 'AWS S3 · eu-west-1', status: 'success', retention: '30 days' },
  { id: 'BKP-2026-0113', timestamp: '23 Apr 02:00', type: 'Full', size: '14.1 GB', duration: '7 min', destination: 'AWS S3 · eu-west-1', status: 'success', retention: '30 days' },
  { id: 'BKP-2026-0112', timestamp: '22 Apr 02:00', type: 'Full', size: '14.0 GB', duration: '8 min', destination: 'AWS S3 · eu-west-1', status: 'success', retention: '30 days' },
  { id: 'BKP-2026-0111', timestamp: '21 Apr 02:00', type: 'Full', size: '14.0 GB', duration: '9 min', destination: 'AWS S3 · eu-west-1', status: 'success', retention: '30 days' },
  { id: 'BKP-2026-W17', timestamp: '20 Apr 02:00', type: 'Weekly Archive', size: '14.0 GB', duration: '11 min', destination: 'AWS Glacier · eu-west-1', status: 'success', retention: '12 months' },
  { id: 'BKP-2026-M03', timestamp: '01 Apr 02:00', type: 'Monthly Archive', size: '13.4 GB', duration: '14 min', destination: 'AWS Glacier · eu-west-1', status: 'success', retention: '7 years' },
];

const API_KEYS = [
  { id: 'KEY-001', name: 'Production · main', created: '15 Mar 2024', lastUsed: '25 Apr 06:42', scope: 'read · write', status: 'active' },
  { id: 'KEY-002', name: 'Mobile App · iOS', created: '02 Aug 2024', lastUsed: '25 Apr 07:48', scope: 'read · write', status: 'active' },
  { id: 'KEY-003', name: 'Mobile App · Android', created: '02 Aug 2024', lastUsed: '25 Apr 07:55', scope: 'read · write', status: 'active' },
  { id: 'KEY-004', name: 'Reporting · BI export', created: '14 Nov 2024', lastUsed: '24 Apr 23:00', scope: 'read', status: 'active' },
  { id: 'KEY-005', name: 'Old integration test (deprecated)', created: '04 Feb 2023', lastUsed: '12 Aug 2024', scope: 'read', status: 'revoked' },
];

const WEBHOOKS = [
  { event: 'reservation.created', endpoint: 'https://hooks.thefloatgh.com/booking', deliveries: 4218, success: 99.97, lastDelivery: '25 Apr 07:48' },
  { event: 'reservation.cancelled', endpoint: 'https://hooks.thefloatgh.com/booking', deliveries: 312, success: 100.0, lastDelivery: '24 Apr 14:22' },
  { event: 'guest.checkin', endpoint: 'https://hooks.thefloatgh.com/keycards', deliveries: 1842, success: 99.95, lastDelivery: '25 Apr 07:48' },
  { event: 'payment.received', endpoint: 'https://hooks.thefloatgh.com/finance', deliveries: 5246, success: 99.99, lastDelivery: '25 Apr 06:42' },
];


// ============================================================================
// SYSTEM HEALTH
// ============================================================================
const SystemHealth = ({ setActiveNav }) => {
  const operational = SYSTEM_STATUS.filter(s => s.status === 'operational').length;
  const degraded = SYSTEM_STATUS.filter(s => s.status === 'degraded').length;
  const lastBackup = BACKUPS[0];
  const avgUptime = SYSTEM_STATUS.reduce((s, sv) => s + sv.uptime, 0) / SYSTEM_STATUS.length;

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Operations · Cloud</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>System Health</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{operational} of {SYSTEM_STATUS.length} services healthy · 1 vendor incident in flight · last backup {lastBackup.timestamp}</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={RefreshCw}>Refresh</Btn>
            <Btn variant="primary" icon={Download}>Status Report</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Services Healthy" value={`${operational} / ${SYSTEM_STATUS.length}`} sublabel={degraded > 0 ? `${degraded} degraded` : 'all systems go'} icon={CircleCheck} tone={degraded > 0 ? theme.gold : theme.leaf} />
          <KpiTile label="Avg Uptime · 30d" value={`${avgUptime.toFixed(2)}%`} sublabel="rolling window" icon={Activity} tone={theme.teal} />
          <KpiTile label="Active Sessions" value={PLATFORM_USERS.reduce((s, u) => s + u.sessions, 0)} sublabel={`${PLATFORM_USERS.filter(u => u.sessions > 0).length} users online`} icon={Users} />
          <KpiTile label="Last Backup" value={lastBackup.timestamp.split(' ')[1]} sublabel={`${lastBackup.size} · ${lastBackup.duration}`} icon={RefreshCw} tone={theme.leaf} />
        </div>

        {degraded > 0 && (
          <div className="p-4 flex items-start gap-3" style={{ background: theme.goldSoft + '60', border: `1px solid ${theme.gold}30`, borderLeft: `3px solid ${theme.gold}` }}>
            <AlertCircle size={16} style={{ color: theme.gold, marginTop: 2 }} />
            <div className="flex-1">
              <div className="font-serif" style={{ fontSize: '17px', color: theme.ink, letterSpacing: '-0.01em' }}>Twilio SMS · degraded performance</div>
              <p className="text-sm mt-1" style={{ color: theme.inkSoft }}>
                Increased latency on Ghana SMS routes since 03:00 today. Twilio status page acknowledged the incident.
                Booking confirmations and check-in notifications may be delayed by 30–60s. No data loss · automatic retry queue active.
              </p>
            </div>
            <Btn variant="ghost" size="sm" icon={Globe}>Twilio Status</Btn>
          </div>
        )}

        <Card title="Service Status" accent={theme.teal} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Service</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Uptime · 30d</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Response</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Last Check</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_STATUS.map((s, i) => {
                const tone = s.status === 'operational' ? 'leaf' : s.status === 'degraded' ? 'gold' : 'clay';
                return (
                  <tr key={s.service} style={{ borderBottom: i < SYSTEM_STATUS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5">
                      <div style={{ color: theme.ink, fontWeight: 500 }}>{s.service}</div>
                      {s.note && <div className="text-[10px] italic mt-0.5" style={{ color: theme.gold }}>{s.note}</div>}
                    </td>
                    <td className="py-3 px-3"><Pill tone={tone} size="sm">{s.status}</Pill></td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: s.uptime >= 99.9 ? theme.leaf : theme.gold, fontWeight: 600 }}>{s.uptime.toFixed(2)}%</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: s.responseTime > 500 ? theme.gold : theme.inkSoft }}>{s.responseTime}ms</td>
                    <td className="py-3 px-5 text-xs" style={{ color: theme.inkSoft }}>{s.lastCheck}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>

        <Card title="Recent Errors" accent={theme.dusk} padded={false}>
          <table className="w-full text-sm">
            <tbody>
              {RECENT_ERRORS.map((e, i) => {
                const tone = e.severity === 'critical' ? 'clay' : e.severity === 'warning' ? 'gold' : 'neutral';
                return (
                  <tr key={e.id} style={{ borderBottom: i < RECENT_ERRORS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5 font-mono text-xs" style={{ color: theme.inkSoft }}>{e.id}</td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{e.timestamp}</td>
                    <td className="py-3 px-3"><Pill tone={tone} size="sm">{e.severity}</Pill></td>
                    <td className="py-3 px-3" style={{ color: theme.ink, fontWeight: 500 }}>{e.service}</td>
                    <td className="py-3 px-3 text-sm" style={{ color: theme.inkSoft }}>{e.message}</td>
                    <td className="py-3 px-5 text-right">{e.resolved && <Pill tone="leaf" size="sm"><Check size={9} /> Resolved</Pill>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// USERS & ROLES
// ============================================================================
const UsersModule = () => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? PLATFORM_USERS : PLATFORM_USERS.filter(u => u.status === filter);
  const mfaCovered = PLATFORM_USERS.filter(u => u.mfa).length;

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Identity & Access</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Users & Roles</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{PLATFORM_USERS.length} users · {mfaCovered} with MFA · password policy: 10-char minimum, 90-day rotation</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Mail}>Bulk Invite</Btn>
            <Btn variant="primary" icon={Plus}>Add User</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Total Users" value={PLATFORM_USERS.length} sublabel={`${PLATFORM_USERS.filter(u => u.status === 'active').length} active`} icon={Users} tone={theme.teal} />
          <KpiTile label="MFA Coverage" value={`${mfaCovered}/${PLATFORM_USERS.length}`} sublabel={pct(mfaCovered/PLATFORM_USERS.length*100) + ' enrolled'} icon={Key} tone={mfaCovered === PLATFORM_USERS.length ? theme.leaf : theme.gold} />
          <KpiTile label="Pending Invites" value={PLATFORM_USERS.filter(u => u.status === 'invited').length} sublabel="awaiting first login" icon={Mail} tone={theme.gold} />
          <KpiTile label="Failed Logins · 24h" value={1} sublabel="IP blocked at firewall" icon={AlertTriangle} tone={theme.clay} />
        </div>

        <div className="p-4 flex items-start gap-3" style={{ background: theme.goldSoft + '40', border: `1px solid ${theme.gold}30`, borderLeft: `3px solid ${theme.gold}` }}>
          <Key size={14} style={{ color: theme.gold, marginTop: 2 }} />
          <div className="flex-1 text-sm">
            <span style={{ color: theme.ink, fontWeight: 600 }}>MFA gap: </span>
            <span style={{ color: theme.inkSoft }}>9 line-staff users (room attendants, servers, front desk agents) don't yet have MFA enabled. Recommend rolling out MFA-required policy by 31 May. Send rollout plan to GM for approval.</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
          <span className="text-[10px] uppercase mr-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</span>
          {['all', 'active', 'invited', 'suspended'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className="text-xs px-3 py-1.5"
              style={{ background: filter === f ? theme.ink : 'transparent', color: filter === f ? theme.bgPanel : theme.inkSoft, border: `1px solid ${filter === f ? theme.ink : theme.rule}`, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {f}
            </button>
          ))}
          <div className="flex-1" />
          <span className="text-xs" style={{ color: theme.inkMute }}>{filtered.length} of {PLATFORM_USERS.length}</span>
        </div>

        <Card title="Platform Users" accent={theme.teal} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>User</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Role</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>MFA</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Last Login</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Sessions</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => {
                const tone = u.status === 'active' ? 'leaf' : u.status === 'invited' ? 'gold' : 'neutral';
                return (
                  <tr key={u.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px]" style={{ background: theme.tealSoft, color: theme.teal, fontWeight: 600 }}>
                          {u.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <div style={{ color: theme.ink, fontWeight: 500 }}>{u.name}</div>
                          <div className="text-[10px]" style={{ color: theme.inkMute }}>{u.email}</div>
                        </div>
                      </div>
                      {u.note && <div className="text-[10px] italic mt-1" style={{ color: theme.dusk }}>{u.note}</div>}
                    </td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{u.role}</td>
                    <td className="py-3 px-3">
                      {u.mfa ? <Pill tone="leaf" size="sm"><Check size={9} /> Enabled</Pill> : <Pill tone="gold" size="sm">Disabled</Pill>}
                    </td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{u.lastLogin}</td>
                    <td className="py-3 px-3 text-right font-mono" style={{ color: u.sessions > 0 ? theme.leaf : theme.inkMute, fontWeight: 600 }}>{u.sessions}</td>
                    <td className="py-3 px-5"><Pill tone={tone} size="sm">{u.status}</Pill></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// AUDIT LOG
// ============================================================================
const AuditModule = () => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? AUDIT_LOG : AUDIT_LOG.filter(a => a.severity === filter);

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Compliance · Activity</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Audit Log</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Searchable activity log · retained 7 years per BRD compliance · last 12 entries shown</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Filter}>Advanced Filter</Btn>
            <Btn variant="primary" icon={Download}>Export Range</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="flex items-center gap-2 p-3" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
          <span className="text-[10px] uppercase mr-2" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Severity</span>
          {['all', 'info', 'warning', 'critical'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className="text-xs px-3 py-1.5"
              style={{ background: filter === f ? theme.ink : 'transparent', color: filter === f ? theme.bgPanel : theme.inkSoft, border: `1px solid ${filter === f ? theme.ink : theme.rule}`, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {f}
            </button>
          ))}
          <div className="flex-1" />
          <span className="text-xs" style={{ color: theme.inkMute }}>{filtered.length} of {AUDIT_LOG.length}</span>
        </div>

        <Card title="Activity Log" accent={theme.dusk} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>ID</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Timestamp</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>User</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Module</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Action · Detail</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Severity</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => {
                const tone = a.severity === 'critical' ? 'clay' : a.severity === 'warning' ? 'gold' : 'neutral';
                return (
                  <tr key={a.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                    <td className="py-3 px-5 font-mono text-xs" style={{ color: theme.inkSoft }}>{a.id}</td>
                    <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{a.timestamp}</td>
                    <td className="py-3 px-3 text-sm" style={{ color: a.user === 'unknown' ? theme.clay : theme.ink, fontWeight: 500 }}>{a.user}</td>
                    <td className="py-3 px-3"><Pill tone="neutral" size="sm">{a.module}</Pill></td>
                    <td className="py-3 px-3">
                      <div style={{ color: theme.ink }}>{a.action}</div>
                      <div className="text-xs italic" style={{ color: theme.inkSoft }}>{a.detail}</div>
                      {a.followUp && <div className="text-[10px] mt-0.5" style={{ color: theme.leaf, fontWeight: 500 }}>Follow-up: {a.followUp}</div>}
                    </td>
                    <td className="py-3 px-5"><Pill tone={tone} size="sm">{a.severity}</Pill></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};


// ============================================================================
// INTEGRATIONS
// ============================================================================
const IntegrationsModule = () => {
  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>External Connections</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Integrations</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{INTEGRATIONS.filter(i => i.status === 'connected').length} connected · {INTEGRATIONS.filter(i => i.status === 'degraded').length} degraded · click any to view config</div>
          </div>
          <Btn variant="primary" icon={Plus}>Add Integration</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {INTEGRATIONS.map(i => {
            const tone = i.status === 'connected' ? 'leaf' : i.status === 'degraded' ? 'gold' : 'neutral';
            const accent = tone === 'leaf' ? theme.leaf : tone === 'gold' ? theme.gold : theme.dusk;
            return (
              <div key={i.id} className="p-5" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${accent}` }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-[10px] uppercase mb-1" style={{ color: theme.gold, letterSpacing: '0.16em', fontWeight: 700 }}>{i.category}</div>
                    <div className="font-serif" style={{ fontSize: '20px', color: theme.ink, letterSpacing: '-0.01em' }}>{i.name}</div>
                  </div>
                  <Pill tone={tone}>{i.status}</Pill>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span style={{ color: theme.inkMute }}>Endpoint</span><span className="font-mono" style={{ color: theme.ink }}>{i.endpoint}</span></div>
                  <div className="flex justify-between"><span style={{ color: theme.inkMute }}>API Version</span><span className="font-mono" style={{ color: theme.ink }}>{i.version}</span></div>
                  <div className="flex justify-between"><span style={{ color: theme.inkMute }}>Last Sync</span><span style={{ color: theme.ink }}>{i.lastSync}</span></div>
                  <div className="flex justify-between"><span style={{ color: theme.inkMute }}>Config</span><span style={{ color: theme.ink, textAlign: 'right', maxWidth: '60%' }}>{i.config}</span></div>
                </div>
                {i.notes && <div className="mt-3 pt-3 text-[11px] italic" style={{ color: theme.inkSoft, borderTop: `1px solid ${theme.ruleSoft}` }}>{i.notes}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// BACKUPS
// ============================================================================
const BackupsModule = () => {
  const successCount = BACKUPS.filter(b => b.status === 'success').length;
  const lastBackup = BACKUPS[0];

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Disaster Recovery</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Backups</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Daily 02:00 UTC · weekly archive · monthly archive · all encrypted at rest</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Eye}>Test Restore</Btn>
            <Btn variant="primary" icon={RefreshCw}>Run Backup Now</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiTile label="Last Backup" value={lastBackup.timestamp.split(' ')[1]} sublabel={lastBackup.timestamp.split(' ')[0]} icon={CircleCheck} tone={theme.leaf} />
          <KpiTile label="Last Size" value={lastBackup.size} sublabel={lastBackup.duration + ' duration'} icon={Package} />
          <KpiTile label="Recent Success" value={`${successCount}/${BACKUPS.length}`} sublabel="last 7 backups" icon={Activity} tone={theme.leaf} />
          <KpiTile label="Encryption" value="AES-256" sublabel="at rest + in transit" icon={Key} tone={theme.dusk} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Retention Policy" accent={theme.teal}>
            <div className="space-y-3">
              {[
                { tier: 'Daily Snapshots', retention: '30 days', destination: 'AWS S3 · eu-west-1', encryption: 'AES-256' },
                { tier: 'Weekly Archives', retention: '12 months', destination: 'AWS Glacier', encryption: 'AES-256' },
                { tier: 'Monthly Archives', retention: '7 years', destination: 'AWS Glacier Deep', encryption: 'AES-256' },
              ].map(p => (
                <div key={p.tier} className="p-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-serif" style={{ fontSize: '15px', color: theme.ink, letterSpacing: '-0.01em', fontWeight: 500 }}>{p.tier}</span>
                    <Pill tone="dusk" size="sm">{p.retention}</Pill>
                  </div>
                  <div className="text-xs" style={{ color: theme.inkSoft }}>{p.destination} · {p.encryption}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Recovery Capability" accent={theme.gold}>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Recovery Time Objective (RTO)</div>
                <div className="font-serif text-xl" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>4 hours</div>
                <div className="text-xs" style={{ color: theme.inkSoft }}>From failure detection to operational restore</div>
              </div>
              <div className="pt-3" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
                <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Recovery Point Objective (RPO)</div>
                <div className="font-serif text-xl" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>24 hours</div>
                <div className="text-xs" style={{ color: theme.inkSoft }}>Maximum data loss tolerable</div>
              </div>
              <div className="pt-3" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
                <div className="text-[10px] uppercase mb-1" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Last Tested Restore</div>
                <div className="font-serif text-xl" style={{ color: theme.leaf, letterSpacing: '-0.01em' }}>14 March 2026</div>
                <div className="text-xs" style={{ color: theme.inkSoft }}>Quarterly DR drill · next: 14 June 2026</div>
              </div>
            </div>
          </Card>
        </div>

        <Card title="Recent Backups" accent={theme.leaf} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Backup ID</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Timestamp</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Type</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Size</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Duration</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Destination</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {BACKUPS.map((b, i) => (
                <tr key={b.id} style={{ borderBottom: i < BACKUPS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5 font-mono text-xs" style={{ color: theme.ink, fontWeight: 500 }}>{b.id}</td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{b.timestamp}</td>
                  <td className="py-3 px-3"><Pill tone={b.type === 'Monthly Archive' ? 'gold' : b.type === 'Weekly Archive' ? 'dusk' : 'teal'} size="sm">{b.type}</Pill></td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{b.size}</td>
                  <td className="py-3 px-3 text-right font-mono text-xs" style={{ color: theme.inkSoft }}>{b.duration}</td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{b.destination}</td>
                  <td className="py-3 px-5"><Pill tone="leaf" size="sm"><Check size={9} /> {b.status}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// LICENSE & UPDATES
// ============================================================================
const LicenseModule = () => {
  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Subscription · Updates</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>License & Updates</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Cloud SaaS subscription · Boutique Plan · auto-update enabled</div>
          </div>
          <Btn variant="secondary" icon={Download}>Download Invoice</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.gold}` }}>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>Current Plan</div>
            <div className="font-serif" style={{ fontSize: '28px', color: theme.ink, letterSpacing: '-0.02em' }}>Boutique · Cloud SaaS</div>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Single property · up to 50 rooms · unlimited users</div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span style={{ color: theme.inkMute }}>Subscription start</span><span style={{ color: theme.ink, fontWeight: 500 }}>01 March 2024</span></div>
              <div className="flex justify-between"><span style={{ color: theme.inkMute }}>Renewal date</span><span style={{ color: theme.ink, fontWeight: 500 }}>01 March 2027</span></div>
              <div className="flex justify-between"><span style={{ color: theme.inkMute }}>Annual fee</span><span className="font-mono" style={{ color: theme.gold, fontWeight: 600 }}>{cedi(284000)}</span></div>
              <div className="flex justify-between"><span style={{ color: theme.inkMute }}>Billing</span><span style={{ color: theme.ink }}>Annual · paid in advance</span></div>
            </div>
          </div>

          <div className="p-6" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.leaf}` }}>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.leaf, letterSpacing: '0.18em', fontWeight: 700 }}>Update Channel</div>
            <div className="font-serif" style={{ fontSize: '28px', color: theme.ink, letterSpacing: '-0.02em' }}>Stable · Auto-update</div>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Updates applied during 02:00–04:00 maintenance window</div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span style={{ color: theme.inkMute }}>Current version</span><span className="font-mono" style={{ color: theme.ink, fontWeight: 500 }}>v1.0.4</span></div>
              <div className="flex justify-between"><span style={{ color: theme.inkMute }}>Released</span><span style={{ color: theme.ink }}>14 April 2026</span></div>
              <div className="flex justify-between"><span style={{ color: theme.inkMute }}>Next scheduled</span><span style={{ color: theme.ink }}>v1.0.5 · 04 May 2026</span></div>
              <div className="flex justify-between"><span style={{ color: theme.inkMute }}>Mode</span><span style={{ color: theme.leaf, fontWeight: 500 }}>Auto · stable channel</span></div>
            </div>
          </div>
        </div>

        <Card title="Recent Releases" accent={theme.dusk} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Version</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Released</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Highlights</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { version: 'v1.0.4', date: '14 Apr 2026', highlights: 'Reports module redesign · MoMo gateway improvements · Tape Chart drag-drop preview', status: 'installed' },
                { version: 'v1.0.3', date: '24 Mar 2026', highlights: 'Approval workflow multi-level · password policy upgrade', status: 'installed' },
                { version: 'v1.0.2', date: '02 Mar 2026', highlights: 'Tax engine · Tourism Levy · GHIPSS payroll batch export', status: 'installed' },
                { version: 'v1.0.1', date: '14 Feb 2026', highlights: 'Performance hardening · search indexing · 14% faster reports', status: 'installed' },
                { version: 'v1.0.0', date: '01 Mar 2024', highlights: 'GA release · all departmental modules · branded PDF exports', status: 'installed' },
              ].map((r, i, arr) => (
                <tr key={r.version} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5 font-mono" style={{ color: theme.ink, fontWeight: 500 }}>{r.version}</td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{r.date}</td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{r.highlights}</td>
                  <td className="py-3 px-5"><Pill tone="leaf" size="sm"><Check size={9} /> Installed</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// API & WEBHOOKS
// ============================================================================
const APIModule = () => {
  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Developer Access</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>API & Webhooks</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>REST API · OAuth 2.0 · webhook delivery for system events</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Globe}>API Docs</Btn>
            <Btn variant="primary" icon={Plus}>Generate Key</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <Card title="API Keys" accent={theme.gold} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Key Name</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Created</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Last Used</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Scope</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {API_KEYS.map((k, i) => (
                <tr key={k.id} style={{ borderBottom: i < API_KEYS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none', opacity: k.status === 'revoked' ? 0.5 : 1 }}>
                  <td className="py-3 px-5">
                    <div style={{ color: theme.ink, fontWeight: 500 }}>{k.name}</div>
                    <div className="font-mono text-[10px]" style={{ color: theme.inkMute }}>{k.id}</div>
                  </td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{k.created}</td>
                  <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{k.lastUsed}</td>
                  <td className="py-3 px-3"><Pill tone="neutral" size="sm">{k.scope}</Pill></td>
                  <td className="py-3 px-5">
                    {k.status === 'active' ? <Pill tone="leaf" size="sm">Active</Pill> : <Pill tone="clay" size="sm">Revoked</Pill>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Webhook Endpoints" accent={theme.teal} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Event</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Endpoint</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Deliveries</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Success Rate</th>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Last Delivery</th>
              </tr>
            </thead>
            <tbody>
              {WEBHOOKS.map((w, i) => (
                <tr key={w.event} style={{ borderBottom: i < WEBHOOKS.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5"><span className="font-mono text-xs" style={{ color: theme.ink, fontWeight: 500 }}>{w.event}</span></td>
                  <td className="py-3 px-3"><span className="font-mono text-xs" style={{ color: theme.inkSoft }}>{w.endpoint}</span></td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{fmt(w.deliveries)}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: w.success >= 99.9 ? theme.leaf : theme.gold, fontWeight: 600 }}>{w.success.toFixed(2)}%</td>
                  <td className="py-3 px-5 text-xs" style={{ color: theme.inkSoft }}>{w.lastDelivery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// CONFIGURATION
// ============================================================================
const ConfigModule = () => {
  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>System · Preferences</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Configuration</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>System-wide preferences · timezone · date format · fiscal year</div>
          </div>
          <Btn variant="primary" icon={Check}>Save Changes</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Locale & Time" accent={theme.teal}>
            <div className="space-y-4">
              <InfoTile label="Timezone" value="Africa/Accra (GMT+0)" />
              <InfoTile label="Date Format" value="DD MMM YYYY (25 Apr 2026)" />
              <InfoTile label="Time Format" value="24-hour" />
              <InfoTile label="Currency" value="Ghana Cedi (₵) · GHS" />
              <InfoTile label="Secondary Currency" value="USD (display only)" />
            </div>
          </Card>

          <Card title="Fiscal & Period Lock" accent={theme.gold}>
            <div className="space-y-4">
              <InfoTile label="Fiscal Year Start" value="01 January" />
              <InfoTile label="Current Period" value="April 2026 · Open" />
              <InfoTile label="Last Closed Period" value="March 2026 · Locked 04 Apr" />
              <InfoTile label="Period Lock Authority" value="Chief Accountant + GM" />
            </div>
          </Card>

          <Card title="Tax Configuration" accent={theme.dusk}>
            <div className="space-y-4">
              <InfoTile label="VAT Rate" value="12.5%" />
              <InfoTile label="Tourism Levy" value="2.5%" />
              <InfoTile label="GETFund Levy" value="2.5%" />
              <InfoTile label="NHIL" value="2.5%" />
              <InfoTile label="Combined VAT + Levies" value="15% (effective)" />
              <InfoTile label="Tax Authority" value="Ghana Revenue Authority" />
            </div>
          </Card>

          <Card title="Hotel Identity" accent={theme.hibiscus}>
            <div className="space-y-4">
              <InfoTile label="Property Name" value="The Float" />
              <InfoTile label="Tagline" value="Waterfront Luxury · Akosombo" />
              <InfoTile label="Address" value="Akosombo · Volta Region · Ghana" />
              <InfoTile label="VAT Registration" value="GH-VAT-2024-7821" />
              <InfoTile label="Business Type" value="Boutique Hotel · 32 rooms" />
              <InfoTile label="Logo" value="thefloat-logo.svg · 1.4 KB" />
            </div>
          </Card>

          <Card title="Password Policy" accent={theme.dusk}>
            <div className="space-y-4">
              <InfoTile label="Minimum Length" value="10 characters" />
              <InfoTile label="Complexity" value="Upper + lower + digit + symbol" />
              <InfoTile label="Password History" value="5 most recent" />
              <InfoTile label="Rotation" value="90 days · configurable" />
              <InfoTile label="MFA" value="TOTP · enforced for management roles" />
              <InfoTile label="SSO" value="SAML 2.0 · OIDC · available" />
            </div>
          </Card>

          <Card title="Operational Hours" accent={theme.leaf}>
            <div className="space-y-4">
              <InfoTile label="Front Desk" value="24/7" />
              <InfoTile label="Restaurant Service" value="07:00–22:00" />
              <InfoTile label="Bar Service" value="11:00–01:00" />
              <InfoTile label="Pool Hours" value="07:00–20:00" />
              <InfoTile label="Night Audit Cutoff" value="03:00 daily" />
              <InfoTile label="Daily Backup Window" value="02:00–04:00 UTC" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMING SOON
// ============================================================================
const ItComingSoon = ({ title }) => (
  <div className="p-4 md:p-6" style={{ background: theme.bg, minHeight: '100%' }}>
    <SectionHeader overline="Module" title={title} />
    <div className="p-12 text-center" style={{ background: theme.bgPanel, border: `1px dashed ${theme.rule}` }}>
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ background: theme.tealSoft, color: theme.teal }}><Sparkles size={20} /></div>
      <p className="font-serif text-lg mb-2" style={{ color: theme.ink, letterSpacing: '-0.01em' }}>Module defined in the BRD</p>
      <p className="text-sm" style={{ color: theme.inkSoft }}>To be built in the next sprint.</p>
    </div>
  </div>
);

// ============================================================================
// APP
// ============================================================================
const ItApp = () => {
  const [activeNav, setActiveNav] = useState('it-health');
  let content;
  if (activeNav === 'it-health') content = <SystemHealth setActiveNav={setActiveNav} />;
  else if (activeNav === 'it-users') content = <UsersModule />;
  else if (activeNav === 'it-audit') content = <AuditModule />;
  else if (activeNav === 'it-integrations') content = <IntegrationsModule />;
  else if (activeNav === 'it-backups') content = <BackupsModule />;
  else if (activeNav === 'it-license') content = <LicenseModule />;
  else if (activeNav === 'it-api') content = <APIModule />;
  else if (activeNav === 'it-config') content = <ConfigModule />;
  else content = <ItComingSoon title="Module" />;

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: theme.bg, fontFamily: '"Inter", system-ui, sans-serif', color: theme.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.rule}; }
      `}</style>
      <ItSidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ItTopBar />
        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
};



// ============================================================================
// LAUNCHER · LOGIN · UNIFIED ENTRY POINT
// ============================================================================

// ============================================================================
// RECEPTIONIST PERSONA · Kwame Boateng · Front Desk
// ============================================================================
// ============================================================================
// RECEPTIONIST · Kwame Boateng · Front Desk
// Transactional workspace — check-in, check-out, walk-in, in-house lookup
// ============================================================================
const RECEPTIONIST_NAV = [
  { id: 'queue', label: 'Today\'s Queue', icon: ClipboardList },
  { id: 'checkin', label: 'Check-In', icon: Key },
  { id: 'checkout', label: 'Check-Out', icon: LogOut },
  { id: 'walkin', label: 'Walk-In', icon: PenLine },
  { id: 'inhouse', label: 'In-House Guests', icon: Users },
];

const RECEPTIONIST_QUEUE = [
  { id: 'R1041', guest: 'Anneke Visser', room: '204', type: 'Lakeview Suite', eta: '14:30', vip: true, source: 'Direct', nights: 3, action: 'arriving', special: 'Anniversary — flowers + champagne ready', confirmed: true, depositPaid: 1500, balance: 7020 },
  { id: 'R1042', guest: 'Marcus Holm',   room: '108', type: 'Garden Room',     eta: '15:00', vip: false, source: 'Booking.com', nights: 2, action: 'arriving', special: '', confirmed: true, depositPaid: 0, balance: 2480 },
  { id: 'R1043', guest: 'Ines & Carlos Reyes', room: '301', type: 'Volta Suite', eta: '16:00', vip: true, source: 'Direct', nights: 4, action: 'in-room', special: 'Late dinner reservation 21:00', confirmed: true, depositPaid: 2000, balance: 12720 },
  { id: 'R1031', guest: 'David Chen',    room: '109', type: 'Standard',         eta: 'now',   vip: false, source: 'Booking.com', nights: 2, action: 'departing', special: 'Express check-out preferred', confirmed: true, depositPaid: 0, balance: 1240 },
  { id: 'R1044', guest: 'Tomohiro Sato', room: null,  type: 'Standard',         eta: '16:30', vip: false, source: 'Expedia', nights: 1, action: 'arriving', special: 'Arriving by ferry', confirmed: true, depositPaid: 0, balance: 980 },
  { id: 'R1045', guest: 'Lena Bauer',    room: null,  type: 'Standard',         eta: '17:00', vip: false, source: 'Direct', nights: 2, action: 'arriving', special: '', confirmed: true, depositPaid: 600, balance: 580 },
];

const IN_HOUSE = [
  { id: 'R1029', guest: 'Hiroshi Yamada', room: '202', type: 'Lakeview', nights: 4, daysLeft: 1, balance: 6480, vip: false, special: 'Minibar charge dispute' },
  { id: 'R1043', guest: 'Reyes Family', room: '301', type: 'Volta Suite', nights: 4, daysLeft: 3, balance: 12720, vip: true, special: 'Late dinner res 21:00' },
  { id: 'R1037', guest: 'Asante Wedding (8 pax)', room: '4× Deluxe', type: 'Group', nights: 2, daysLeft: 1, balance: 13200, vip: false, special: 'Wedding party — 8 guests' },
  { id: 'R1031', guest: 'David Chen', room: '109', type: 'Standard', nights: 2, daysLeft: 0, balance: 1240, vip: false, special: 'Express check-out' },
];

const ReceptionistQueueModule = () => {
  const arriving = RECEPTIONIST_QUEUE.filter(r => r.action === 'arriving');
  const departing = RECEPTIONIST_QUEUE.filter(r => r.action === 'departing');
  const inRoom = RECEPTIONIST_QUEUE.filter(r => r.action === 'in-room');
  
  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Front Desk · Today</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Today's Queue</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{arriving.length} arrivals · {departing.length} departures · {inRoom.length} already in</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="secondary" icon={Search}>Find Guest</Btn>
            <Btn variant="primary" icon={PenLine}>New Walk-In</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiTile label="Arrivals Today" value={arriving.length} sublabel="next: 14:30" icon={Bed} tone={theme.gold} />
          <KpiTile label="Departures" value={departing.length + 4} sublabel="3 by 11:00" icon={LogOut} tone={theme.teal} />
          <KpiTile label="In-House" value={IN_HOUSE.length + 14} sublabel="across 32 rooms" icon={Users} tone={theme.dusk} />
          <KpiTile label="VIP Today" value={2} sublabel="Visser · Reyes" icon={Star} tone={theme.hibiscus} />
        </div>

        {/* Departing first - urgent */}
        {departing.length > 0 && (
          <Card title="Departing Now" accent={theme.clay}>
            <div className="space-y-2">
              {departing.map(g => (
                <div key={g.id} className="p-3 flex items-center gap-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}`, borderLeft: `3px solid ${theme.clay}` }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: theme.claySoft, color: theme.clay, fontWeight: 600, fontSize: '13px' }}>{g.guest.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm" style={{ color: theme.ink, fontWeight: 600 }}>{g.guest}</div>
                    <div className="text-xs" style={{ color: theme.inkSoft }}>Room {g.room} · {g.nights}n · Balance {cedi(g.balance)}</div>
                    {g.special && <div className="text-[10px] italic mt-0.5" style={{ color: theme.dusk }}>{g.special}</div>}
                  </div>
                  <Btn variant="primary" size="sm" icon={LogOut}>Check Out</Btn>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Expected arrivals */}
        <Card title={`Arriving Today · ${arriving.length} guests`} accent={theme.gold}>
          <div className="space-y-2">
            {arriving.map(g => (
              <div key={g.id} className="p-3 flex items-center gap-3" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}`, borderLeft: `3px solid ${g.vip ? theme.hibiscus : theme.gold}` }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: g.vip ? theme.hibiscusSoft : theme.goldSoft, color: g.vip ? theme.hibiscus : theme.gold, fontWeight: 600, fontSize: '13px' }}>{g.guest.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="text-sm" style={{ color: theme.ink, fontWeight: 600 }}>{g.guest}</div>
                    {g.vip && <Pill tone="hibiscus" size="sm"><Star size={9} /> VIP</Pill>}
                  </div>
                  <div className="text-xs" style={{ color: theme.inkSoft }}>{g.type}{g.room ? ` · Room ${g.room}` : ' · No room assigned'} · {g.nights}n · ETA {g.eta}</div>
                  {g.special && <div className="text-[10px] italic mt-0.5" style={{ color: theme.gold }}>{g.special}</div>}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="text-xs font-mono" style={{ color: theme.inkSoft }}>{cedi(g.balance)} due</div>
                  <Btn variant="primary" size="sm" icon={Key}>Check In</Btn>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="p-4 flex items-start gap-3" style={{ background: theme.tealSoft + '40', border: `1px solid ${theme.teal}30`, borderLeft: `3px solid ${theme.teal}` }}>
          <Sparkles size={16} style={{ color: theme.teal, marginTop: 2 }} />
          <div className="flex-1 text-sm">
            <span style={{ color: theme.ink, fontWeight: 600 }}>Pre-arrival prep tip: </span>
            <span style={{ color: theme.inkSoft }}>Anneke Visser arriving 14:30 — anniversary VIP. Room 204 prepared with flowers and champagne (per HK note WO-204-prep). Greeting card from Jana on the bedside table.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReceptionistCheckInModule = () => {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(0); // 0=select guest, 1=ID, 2=card key, 3=done
  const arriving = RECEPTIONIST_QUEUE.filter(r => r.action === 'arriving');

  if (selected) {
    return (
      <div style={{ background: theme.bg, minHeight: '100%' }}>
        <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
          <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
            <div>
              <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Check-In · Step {step + 1} of 3</div>
              <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>{selected.guest}</h1>
              <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{selected.type} · Room {selected.room || 'TBA'} · {selected.nights} nights</div>
            </div>
            <Btn variant="ghost" icon={ArrowLeft} onClick={() => { setSelected(null); setStep(0); }}>Back to Queue</Btn>
          </div>
        </div>

        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
          {/* Stepper */}
          <div className="flex items-center gap-2 mb-4">
            {[
              { n: 0, label: 'Guest Info' },
              { n: 1, label: 'ID Capture' },
              { n: 2, label: 'Room & Key' },
            ].map((s, i, arr) => (
              <React.Fragment key={s.n}>
                <div className={`flex items-center gap-2 px-3 py-1.5`} style={{ background: step >= s.n ? theme.gold : theme.bgPanel, color: step >= s.n ? theme.navBg : theme.inkMute, border: `1px solid ${step >= s.n ? theme.gold : theme.rule}`, fontSize: '11px', fontWeight: 600 }}>
                  {step > s.n ? <Check size={11} /> : <span>{s.n + 1}</span>}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < arr.length - 1 && <div className="flex-1 h-px" style={{ background: step > s.n ? theme.gold : theme.rule }} />}
              </React.Fragment>
            ))}
          </div>

          {step === 0 && (
            <Card title="Guest Information" accent={theme.gold}>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Full Name</label>
                    <input defaultValue={selected.guest} className="w-full mt-1 px-3 py-2" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink, fontSize: '14px' }} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Confirmation #</label>
                    <input defaultValue={selected.id} className="w-full mt-1 px-3 py-2 font-mono" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink, fontSize: '14px' }} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Email</label>
                    <input placeholder="guest@example.com" className="w-full mt-1 px-3 py-2" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink, fontSize: '14px' }} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Phone</label>
                    <input placeholder="+233 ..." className="w-full mt-1 px-3 py-2" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink, fontSize: '14px' }} />
                  </div>
                </div>
                <div className="pt-3 flex justify-end" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
                  <Btn variant="primary" icon={ArrowRight} onClick={() => setStep(1)}>Continue to ID</Btn>
                </div>
              </div>
            </Card>
          )}

          {step === 1 && (
            <Card title="ID & Compliance" accent={theme.teal}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button className="p-6 text-left transition-all" style={{ background: theme.tealSoft + '40', border: `2px dashed ${theme.teal}` }}>
                    <Camera size={32} style={{ color: theme.teal }} />
                    <div className="mt-2" style={{ color: theme.ink, fontWeight: 600, fontSize: '14px' }}>Scan Passport / ID</div>
                    <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>Tap to scan with the desk camera</div>
                  </button>
                  <div className="space-y-2">
                    <div>
                      <label className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Document Type</label>
                      <select className="w-full mt-1 px-3 py-2" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink, fontSize: '14px' }}>
                        <option>Passport</option>
                        <option>National ID (Ghana Card)</option>
                        <option>Driver's License</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Document Number</label>
                      <input placeholder="P12345678" className="w-full mt-1 px-3 py-2 font-mono" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink, fontSize: '14px' }} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Nationality</label>
                      <input placeholder="Netherlands" className="w-full mt-1 px-3 py-2" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink, fontSize: '14px' }} />
                    </div>
                  </div>
                </div>
                <div className="p-3 flex items-start gap-2" style={{ background: theme.goldSoft + '60', border: `1px solid ${theme.gold}30` }}>
                  <CircleAlert size={14} style={{ color: theme.gold, marginTop: 1 }} />
                  <div className="text-xs" style={{ color: theme.inkSoft }}>Ghana Tourism Authority requires guest ID capture for all stays. Information stored securely and only used for compliance.</div>
                </div>
                <div className="pt-3 flex justify-between" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
                  <Btn variant="ghost" icon={ArrowLeft} onClick={() => setStep(0)}>Back</Btn>
                  <Btn variant="primary" icon={ArrowRight} onClick={() => setStep(2)}>Continue to Room</Btn>
                </div>
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card title="Room Assignment & Key" accent={theme.gold}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-4" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}` }}>
                    <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>Assigned Room</div>
                    <div className="font-serif" style={{ fontSize: '40px', color: theme.ink, letterSpacing: '-0.02em' }}>{selected.room || '204'}</div>
                    <div className="text-sm" style={{ color: theme.inkSoft }}>{selected.type}</div>
                    <div className="text-xs mt-2" style={{ color: theme.leaf }}><Check size={12} className="inline mr-1" /> Cleaned & inspected · ready</div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Folio Setup</label>
                      <div className="mt-1 p-3" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
                        <div className="flex justify-between text-xs">
                          <span style={{ color: theme.inkSoft }}>Room rate ({selected.nights}n)</span>
                          <span className="font-mono" style={{ color: theme.ink }}>{cedi(selected.nights * 1840)}</span>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span style={{ color: theme.inkSoft }}>VAT (15%) + Tourism Levy</span>
                          <span className="font-mono" style={{ color: theme.ink }}>{cedi(selected.nights * 1840 * 0.15)}</span>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span style={{ color: theme.leaf }}>Deposit paid</span>
                          <span className="font-mono" style={{ color: theme.leaf }}>−{cedi(selected.depositPaid)}</span>
                        </div>
                        <div className="flex justify-between mt-2 pt-2" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
                          <span className="text-sm" style={{ color: theme.ink, fontWeight: 600 }}>Balance on departure</span>
                          <span className="font-mono" style={{ color: theme.gold, fontWeight: 700 }}>{cedi(selected.balance)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full p-4 flex items-center justify-center gap-3 transition-all" style={{ background: theme.gold, color: theme.navBg, fontWeight: 700, fontSize: '14px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  <Key size={18} /> Print Key Card
                </button>
                <div className="pt-3 flex justify-between" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
                  <Btn variant="ghost" icon={ArrowLeft} onClick={() => setStep(1)}>Back</Btn>
                  <Btn variant="primary" icon={Check} onClick={() => setStep(3)}>Complete Check-In</Btn>
                </div>
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card title="Welcome to The Float" accent={theme.leaf}>
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full" style={{ background: theme.leafSoft, color: theme.leaf }}>
                  <Check size={32} />
                </div>
                <div className="font-serif" style={{ fontSize: '26px', color: theme.ink, letterSpacing: '-0.01em' }}>Akwaaba, {selected.guest.split(' ')[0]}!</div>
                <p className="text-sm mt-2" style={{ color: theme.inkSoft }}>
                  Room {selected.room || '204'} · Key card printed · Folio opened · Welcome packet ready
                </p>
                <div className="grid grid-cols-2 gap-2 mt-6 max-w-md mx-auto">
                  <Btn variant="secondary" icon={Mail}>Email Receipt</Btn>
                  <Btn variant="primary" icon={ArrowRight} onClick={() => { setSelected(null); setStep(0); }}>Next Guest</Btn>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5">
          <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Front Desk · Check-In</div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Select Guest to Check In</h1>
          <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{arriving.length} arrivals expected today</div>
        </div>
      </div>
      <div className="px-4 md:px-8 py-4 md:py-6 space-y-3">
        {arriving.map(g => (
          <button key={g.id} onClick={() => setSelected(g)} className="w-full p-4 flex items-center gap-3 transition-all text-left" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${g.vip ? theme.hibiscus : theme.gold}` }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: g.vip ? theme.hibiscusSoft : theme.goldSoft, color: g.vip ? theme.hibiscus : theme.gold, fontWeight: 600, fontSize: '14px' }}>{g.guest.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="text-base" style={{ color: theme.ink, fontWeight: 600 }}>{g.guest}</div>
                {g.vip && <Pill tone="hibiscus" size="sm"><Star size={9} /> VIP</Pill>}
              </div>
              <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>{g.type}{g.room ? ` · Room ${g.room}` : ''} · {g.nights} nights · ETA {g.eta} · {g.source}</div>
            </div>
            <ArrowRight size={20} style={{ color: theme.inkMute }} />
          </button>
        ))}
      </div>
    </div>
  );
};

const ReceptionistCheckOutModule = () => {
  const [selected, setSelected] = useState(null);
  const departing = [...RECEPTIONIST_QUEUE.filter(r => r.action === 'departing'), ...IN_HOUSE.filter(g => g.daysLeft === 0)];

  if (selected) {
    return (
      <div style={{ background: theme.bg, minHeight: '100%' }}>
        <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
          <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
            <div>
              <div className="text-[10px] uppercase mb-2" style={{ color: theme.clay, letterSpacing: '0.24em', fontWeight: 700 }}>Check-Out · Folio Settlement</div>
              <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>{selected.guest}</h1>
              <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Room {selected.room} · {selected.nights} nights · Departing now</div>
            </div>
            <Btn variant="ghost" icon={ArrowLeft} onClick={() => setSelected(null)}>Back</Btn>
          </div>
        </div>

        <div className="px-4 md:px-8 py-4 md:py-6 space-y-4">
          <Card title="Folio · Final Bill" accent={theme.clay} padded={false}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                  <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Date</th>
                  <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Description</th>
                  <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Charge</th>
                  <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Tax</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                  <td className="py-3 px-5" style={{ color: theme.ink }}>23 Apr</td>
                  <td className="py-3 px-3" style={{ color: theme.ink }}>Room — Standard · Night 1</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(620)}</td>
                  <td className="py-3 px-5 text-right font-mono" style={{ color: theme.inkMute }}>{cedi(93)}</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                  <td className="py-3 px-5" style={{ color: theme.ink }}>23 Apr</td>
                  <td className="py-3 px-3" style={{ color: theme.ink }}>Bar — beverages</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(180)}</td>
                  <td className="py-3 px-5 text-right font-mono" style={{ color: theme.inkMute }}>{cedi(27)}</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                  <td className="py-3 px-5" style={{ color: theme.ink }}>24 Apr</td>
                  <td className="py-3 px-3" style={{ color: theme.ink }}>Room — Standard · Night 2</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(620)}</td>
                  <td className="py-3 px-5 text-right font-mono" style={{ color: theme.inkMute }}>{cedi(93)}</td>
                </tr>
                <tr style={{ borderBottom: `1px solid ${theme.ruleSoft}` }}>
                  <td className="py-3 px-5" style={{ color: theme.ink }}>24 Apr</td>
                  <td className="py-3 px-3" style={{ color: theme.ink }}>Restaurant — dinner</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(245)}</td>
                  <td className="py-3 px-5 text-right font-mono" style={{ color: theme.inkMute }}>{cedi(37)}</td>
                </tr>
                <tr style={{ borderTop: `2px solid ${theme.ink}`, background: theme.bgPanelAlt }}>
                  <td className="py-3 px-5 font-serif" style={{ color: theme.ink, fontWeight: 700 }} colSpan={2}>Total Due</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink, fontWeight: 700 }}>{cedi(1665)}</td>
                  <td className="py-3 px-5 text-right font-mono" style={{ color: theme.gold, fontWeight: 700 }}>{cedi(1915)}</td>
                </tr>
              </tbody>
            </table>
          </Card>

          <Card title="Settlement Method" accent={theme.gold}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: 'card', label: 'Card', icon: CreditCard, primary: true },
                { id: 'cash', label: 'Cash', icon: DollarSign },
                { id: 'momo', label: 'MTN MoMo', icon: Phone },
                { id: 'transfer', label: 'Bank Transfer', icon: Receipt },
              ].map(m => {
                const Icon = m.icon;
                return (
                  <button key={m.id} className="p-3 flex flex-col items-center gap-2 transition-all" style={{ background: m.primary ? theme.gold : theme.bg, color: m.primary ? theme.navBg : theme.ink, border: `1px solid ${m.primary ? theme.gold : theme.rule}`, fontWeight: m.primary ? 600 : 400 }}>
                    <Icon size={20} />
                    <span className="text-xs">{m.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 pt-4 flex flex-col md:flex-row gap-2 justify-end" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
              <Btn variant="ghost" icon={Mail}>Email Folio</Btn>
              <Btn variant="secondary" icon={Printer}>Print Receipt</Btn>
              <Btn variant="primary" icon={Check} onClick={() => setSelected(null)}>Settle & Check Out</Btn>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5">
          <div className="text-[10px] uppercase mb-2" style={{ color: theme.clay, letterSpacing: '0.24em', fontWeight: 700 }}>Check-Out</div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Select Guest to Check Out</h1>
          <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{departing.length} departing today</div>
        </div>
      </div>
      <div className="px-4 md:px-8 py-4 md:py-6 space-y-3">
        {departing.map(g => (
          <button key={g.id} onClick={() => setSelected(g)} className="w-full p-4 flex items-center gap-3 transition-all text-left" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${theme.clay}` }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: theme.claySoft, color: theme.clay, fontWeight: 600, fontSize: '14px' }}>{g.guest.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
            <div className="flex-1 min-w-0">
              <div className="text-base" style={{ color: theme.ink, fontWeight: 600 }}>{g.guest}</div>
              <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>Room {g.room} · {g.nights} nights · Balance {cedi(g.balance || 1240)}</div>
              {g.special && <div className="text-[10px] italic mt-0.5" style={{ color: theme.gold }}>{g.special}</div>}
            </div>
            <ArrowRight size={20} style={{ color: theme.inkMute }} />
          </button>
        ))}
      </div>
    </div>
  );
};

const ReceptionistWalkInModule = () => (
  <div style={{ background: theme.bg, minHeight: '100%' }}>
    <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
      <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5">
        <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Walk-In Registration</div>
        <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>New Walk-In Guest</h1>
        <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>4 rooms available now · best rate ₵1,240/night</div>
      </div>
    </div>
    <div className="px-4 md:px-8 py-4 md:py-6 space-y-4">
      <Card title="Available Rooms · Tonight" accent={theme.leaf}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { room: '110', type: 'Standard', rate: 1240, view: 'Garden' },
            { room: '203', type: 'Lakeview', rate: 1840, view: 'Lake' },
            { room: '208', type: 'Lakeview', rate: 1840, view: 'Lake' },
            { room: '305', type: 'Volta Suite', rate: 3680, view: 'Lake panorama' },
          ].map(r => (
            <button key={r.room} className="p-4 text-left transition-all" style={{ background: theme.bg, border: `1px solid ${theme.ruleSoft}`, borderLeft: `3px solid ${theme.leaf}` }}>
              <div className="font-serif" style={{ fontSize: '32px', color: theme.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>{r.room}</div>
              <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>{r.type} · {r.view}</div>
              <div className="text-sm mt-2 font-mono" style={{ color: theme.gold, fontWeight: 700 }}>{cedi(r.rate)}/night</div>
            </button>
          ))}
        </div>
      </Card>

      <Card title="Quick Walk-In Form" accent={theme.gold}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Full Name</label>
            <input className="w-full mt-1 px-3 py-2" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink }} />
          </div>
          <div>
            <label className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Phone</label>
            <input placeholder="+233 ..." className="w-full mt-1 px-3 py-2" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink }} />
          </div>
          <div>
            <label className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Nights</label>
            <input type="number" defaultValue={1} className="w-full mt-1 px-3 py-2 font-mono" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink }} />
          </div>
          <div>
            <label className="text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Guests</label>
            <input type="number" defaultValue={1} className="w-full mt-1 px-3 py-2 font-mono" style={{ background: theme.bg, border: `1px solid ${theme.rule}`, color: theme.ink }} />
          </div>
        </div>
        <div className="mt-4 pt-4 flex justify-end gap-2" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
          <Btn variant="ghost">Cancel</Btn>
          <Btn variant="primary" icon={ArrowRight}>Continue to Check-In</Btn>
        </div>
      </Card>
    </div>
  </div>
);

const ReceptionistInHouseModule = () => (
  <div style={{ background: theme.bg, minHeight: '100%' }}>
    <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
      <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5">
        <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>In-House Guests</div>
        <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>In-House · {IN_HOUSE.length + 14} Guests</h1>
      </div>
    </div>
    <div className="px-4 md:px-8 py-4 md:py-6">
      <Card title="Currently In-House" accent={theme.gold} padded={false}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
              <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Room</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Guest</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Nights</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Departure</th>
              <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Folio</th>
              <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Note</th>
            </tr>
          </thead>
          <tbody>
            {IN_HOUSE.map((g, i) => (
              <tr key={g.id} style={{ borderBottom: i < IN_HOUSE.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                <td className="py-3 px-5 font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{g.room}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <span style={{ color: theme.ink, fontWeight: 500 }}>{g.guest}</span>
                    {g.vip && <Pill tone="hibiscus" size="sm"><Star size={9} /> VIP</Pill>}
                  </div>
                </td>
                <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{g.nights}n</td>
                <td className="py-3 px-3 text-xs" style={{ color: g.daysLeft === 0 ? theme.clay : theme.inkSoft, fontWeight: g.daysLeft === 0 ? 600 : 400 }}>{g.daysLeft === 0 ? 'Today' : `+${g.daysLeft}d`}</td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(g.balance)}</td>
                <td className="py-3 px-5 text-xs italic text-right" style={{ color: theme.inkMute, maxWidth: 200 }}>{g.special || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  </div>
);

const ReceptionistSidebar = ({ activeNav, setActiveNav }) => (
  <aside className="hidden md:flex w-64 flex-shrink-0 flex-col" style={{ background: theme.navBg, color: '#FBF7EE' }}>
    <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <FloatLogo size="md" />
          <div className="text-[10px] mt-1" style={{ color: theme.gold, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Ghana</div>
        </div>
      </div>
    </div>
    <div className="px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium" style={{ background: theme.gold, color: theme.navBg, fontSize: '13px' }}>KB</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm" style={{ fontWeight: 500 }}>Kwame Boateng</div>
          <div className="text-[10px]" style={{ color: theme.gold, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>Receptionist</div>
        </div>
      </div>
    </div>
    <nav className="flex-1 px-3 py-3 overflow-y-auto">
      {RECEPTIONIST_NAV.map(item => {
        const Icon = item.icon;
        const active = activeNav === item.id;
        return (
          <button key={item.id} onClick={() => setActiveNav(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all text-sm"
            style={{ background: active ? 'rgba(185,135,64,0.15)' : 'transparent', color: active ? theme.gold : 'rgba(255,255,255,0.75)', borderLeft: active ? `3px solid ${theme.gold}` : '3px solid transparent', fontWeight: active ? 600 : 400 }}>
            <Icon size={15} />
            <span className="flex-1 text-left">{item.label}</span>
          </button>
        );
      })}
    </nav>
    <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span>v1.0</span>
        <button className="hover:text-white"><LogOut size={12} /></button>
      </div>
    </div>
  </aside>
);

const ReceptionistTopBar = () => (
  <div className="flex items-center justify-between pl-16 pr-4 md:px-8 py-3 md:py-4" style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
    <div className="flex items-center gap-3 text-sm" style={{ color: theme.inkSoft }}>
      <Calendar size={14} /><span className="hidden md:inline">Saturday, 25 April 2026 · Shift 14:00–22:00</span><span className="md:hidden">Sat 25 Apr</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5" style={{ background: theme.bg, border: `1px solid ${theme.rule}` }}>
        <Search size={13} style={{ color: theme.inkMute }} />
        <input placeholder="Search guest by name or room..." className="bg-transparent outline-none text-sm w-56" style={{ color: theme.ink }} />
      </div>
      <button className="relative p-2"><Bell size={15} style={{ color: theme.inkSoft }} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: theme.gold }} /></button>
    </div>
  </div>
);

const ReceptionistApp = () => {
  const [activeNav, setActiveNav] = useState('queue');
  let content;
  if (activeNav === 'queue') content = <ReceptionistQueueModule />;
  else if (activeNav === 'checkin') content = <ReceptionistCheckInModule />;
  else if (activeNav === 'checkout') content = <ReceptionistCheckOutModule />;
  else if (activeNav === 'walkin') content = <ReceptionistWalkInModule />;
  else if (activeNav === 'inhouse') content = <ReceptionistInHouseModule />;
  
  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: theme.bg, fontFamily: '"Inter", system-ui, sans-serif', color: theme.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.rule}; }
      `}</style>
      <ReceptionistSidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ReceptionistTopBar />
        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
};


// ============================================================================
// WAITER PERSONA · Kofi Asante · POS
// ============================================================================
// ============================================================================
// WAITER · Kofi Asante · POS · Restaurant Floor
// ============================================================================
const WAITER_NAV = [
  { id: 'tabs', label: 'Open Tabs', icon: ClipboardList, badge: 6 },
  { id: 'newtab', label: 'New Order', icon: Plus },
  { id: 'menu', label: 'Menu', icon: BookOpen },
  { id: 'shift', label: 'My Shift', icon: Clock },
];

const WAITER_TABS = [
  { id: 'T-204', table: '4', guests: 2, opened: '19:42', items: [{ name: 'Tilapia · whole', qty: 1, price: 145, course: 'main' }, { name: 'Jollof rice', qty: 1, price: 35, course: 'side' }, { name: 'Star Beer', qty: 2, price: 18, course: 'drinks' }, { name: 'Star Beer', qty: 1, price: 18, course: 'drinks' }], status: 'eating', server: 'Kofi', total: 234 },
  { id: 'T-211', table: '11', guests: 4, opened: '20:12', items: [{ name: 'Plantain crisps', qty: 1, price: 24, course: 'starter' }, { name: 'Goat curry', qty: 2, price: 95, course: 'main' }, { name: 'Banku & tilapia', qty: 1, price: 110, course: 'main' }, { name: 'Volta Wine', qty: 1, price: 280, course: 'drinks' }], status: 'in-kitchen', server: 'Kofi', total: 604 },
  { id: 'T-208', table: '8', guests: 2, opened: '20:05', items: [{ name: 'Anniversary Tasting', qty: 2, price: 380, course: 'set' }, { name: 'Champagne (375ml)', qty: 1, price: 320, course: 'drinks' }], status: 'starter-served', server: 'Kofi', total: 1080, vip: true, note: 'Anniversary — Anneke Visser, Room 204' },
  { id: 'T-206', table: '6', guests: 6, opened: '20:18', items: [{ name: 'Plantain crisps', qty: 2, price: 24, course: 'starter' }, { name: 'Mixed grill', qty: 2, price: 165, course: 'main' }, { name: 'Tilapia · grilled', qty: 1, price: 110, course: 'main' }, { name: 'Bissap juice', qty: 6, price: 12, course: 'drinks' }], status: 'ordering', server: 'Kofi', total: 530 },
  { id: 'T-203', table: '3', guests: 1, opened: '20:24', items: [{ name: 'Goat curry', qty: 1, price: 95, course: 'main' }, { name: 'Star Beer', qty: 1, price: 18, course: 'drinks' }], status: 'in-kitchen', server: 'Kofi', total: 113 },
  { id: 'T-209', table: '9', guests: 3, opened: '20:30', items: [{ name: 'Plantain crisps', qty: 1, price: 24, course: 'starter' }], status: 'starter-served', server: 'Kofi', total: 24 },
];

const WAITER_MENU = {
  starters: [
    { id: 'm-pl', name: 'Plantain Crisps', price: 24, prep: 5 },
    { id: 'm-pe', name: 'Peanut Soup', price: 35, prep: 8 },
    { id: 'm-sl', name: 'Salad of the Lake', price: 42, prep: 6 },
    { id: 'm-bs', name: 'Bissap Cured Tilapia', price: 65, prep: 10 },
  ],
  mains: [
    { id: 'm-tw', name: 'Tilapia · Whole', price: 145, prep: 22 },
    { id: 'm-tg', name: 'Tilapia · Grilled Fillet', price: 110, prep: 18 },
    { id: 'm-bk', name: 'Banku & Tilapia', price: 110, prep: 20 },
    { id: 'm-jl', name: 'Jollof with Chicken', price: 95, prep: 15 },
    { id: 'm-gc', name: 'Goat Curry', price: 95, prep: 25 },
    { id: 'm-mx', name: 'Mixed Grill', price: 165, prep: 22 },
    { id: 'm-vg', name: 'Vegetarian Banku', price: 78, prep: 18 },
  ],
  drinks: [
    { id: 'd-st', name: 'Star Beer', price: 18 },
    { id: 'd-cl', name: 'Club Beer', price: 18 },
    { id: 'd-bs', name: 'Bissap Juice', price: 12 },
    { id: 'd-wt', name: 'Mineral Water', price: 8 },
    { id: 'd-vw', name: 'Volta Vintage Wine (btl)', price: 280 },
    { id: 'd-cm', name: 'Champagne (375ml)', price: 320 },
    { id: 'd-cf', name: 'Coffee', price: 14 },
    { id: 'd-tg', name: 'Tea · Ginger', price: 14 },
  ],
  desserts: [
    { id: 'ds-gr', name: 'Grilled Pineapple', price: 38 },
    { id: 'ds-co', name: 'Coconut Tart', price: 42 },
    { id: 'ds-cb', name: 'Chocolate · Banku Bread', price: 48 },
  ],
};

const WaiterTabsModule = ({ openTab }) => {
  const totalRevenue = WAITER_TABS.reduce((s, t) => s + t.total, 0);
  const statuses = {
    'ordering': { label: 'Taking order', tone: 'gold', icon: PenLine },
    'in-kitchen': { label: 'In kitchen', tone: 'dusk', icon: ChefHat },
    'starter-served': { label: 'Starter out', tone: 'teal', icon: Utensils },
    'eating': { label: 'Eating', tone: 'leaf', icon: Coffee },
  };

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Service · Restaurant Floor</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>My Tables</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{WAITER_TABS.length} active tabs · {WAITER_TABS.reduce((s,t)=>s+t.guests,0)} covers · {cedi(totalRevenue)} on the floor</div>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="primary" icon={Plus}>New Order</Btn>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <KpiTile label="Active Tabs" value={WAITER_TABS.length} sublabel={`${WAITER_TABS.reduce((s,t)=>s+t.guests,0)} covers`} icon={Utensils} tone={theme.gold} />
          <KpiTile label="Floor Revenue" value={cedi(totalRevenue)} sublabel="on tabs now" icon={DollarSign} tone={theme.teal} />
          <KpiTile label="Avg Cover" value={cedi(Math.round(totalRevenue / WAITER_TABS.reduce((s,t)=>s+t.guests,0)))} sublabel="this service" icon={TrendingUp} tone={theme.leaf} />
          <KpiTile label="Tonight's Tips" value={cedi(180)} sublabel="estimated" icon={Sparkles} tone={theme.hibiscus} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {WAITER_TABS.map(t => {
            const s = statuses[t.status];
            const Icon = s.icon;
            const accentColor = s.tone === 'gold' ? theme.gold : s.tone === 'dusk' ? theme.dusk : s.tone === 'teal' ? theme.teal : theme.leaf;
            return (
              <button key={t.id} onClick={() => openTab(t)} className="p-4 text-left transition-all" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}`, borderLeft: `3px solid ${t.vip ? theme.hibiscus : accentColor}` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="font-serif" style={{ fontSize: '32px', color: theme.ink, letterSpacing: '-0.02em', lineHeight: 1 }}>T{t.table}</div>
                    {t.vip && <Pill tone="hibiscus" size="sm"><Star size={9} /> VIP</Pill>}
                  </div>
                  <Pill tone={s.tone} size="sm"><Icon size={9} /> {s.label}</Pill>
                </div>
                <div className="text-xs" style={{ color: theme.inkSoft }}>{t.guests} guests · opened {t.opened}</div>
                {t.note && <div className="text-[10px] italic mt-1" style={{ color: theme.hibiscus }}>{t.note}</div>}
                <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
                  <div className="text-xs" style={{ color: theme.inkMute }}>{t.items.length} items</div>
                  <div className="font-mono text-base" style={{ color: theme.gold, fontWeight: 700 }}>{cedi(t.total)}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const WaiterTabDetailModule = ({ tab, onBack }) => {
  if (!tab) return null;
  const subtotal = tab.items.reduce((s, i) => s + (i.price * i.qty), 0);
  const tax = subtotal * 0.15;
  const service = subtotal * 0.10;
  const total = subtotal + tax + service;

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-0">
          <div>
            <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>Tab · Table {tab.table}</div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>{tab.id}</h1>
            <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>{tab.guests} guests · opened {tab.opened}{tab.vip ? ' · VIP' : ''}</div>
            {tab.note && <div className="text-xs mt-1 italic" style={{ color: theme.hibiscus }}>{tab.note}</div>}
          </div>
          <Btn variant="ghost" icon={ArrowLeft} onClick={onBack}>Back</Btn>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-6 space-y-4">
        <Card title="Items on Tab" accent={theme.gold} padded={false}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
                <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Qty</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Item</th>
                <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Course</th>
                <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Price</th>
                <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {tab.items.map((item, i) => (
                <tr key={i} style={{ borderBottom: i < tab.items.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                  <td className="py-3 px-5 font-mono" style={{ color: theme.ink, fontWeight: 600 }}>{item.qty}</td>
                  <td className="py-3 px-3" style={{ color: theme.ink }}>{item.name}</td>
                  <td className="py-3 px-3 text-xs italic" style={{ color: theme.inkMute }}>{item.course}</td>
                  <td className="py-3 px-3 text-right font-mono" style={{ color: theme.inkSoft }}>{cedi(item.price)}</td>
                  <td className="py-3 px-5 text-right font-mono" style={{ color: theme.ink, fontWeight: 500 }}>{cedi(item.price * item.qty)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-4" style={{ background: theme.bg, borderTop: `1px solid ${theme.rule}` }}>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span style={{ color: theme.inkSoft }}>Subtotal</span><span className="font-mono" style={{ color: theme.ink }}>{cedi(subtotal)}</span></div>
              <div className="flex justify-between"><span style={{ color: theme.inkSoft }}>VAT 15% + Tourism Levy</span><span className="font-mono" style={{ color: theme.ink }}>{cedi(tax)}</span></div>
              <div className="flex justify-between"><span style={{ color: theme.inkSoft }}>Service charge 10%</span><span className="font-mono" style={{ color: theme.ink }}>{cedi(service)}</span></div>
              <div className="flex justify-between pt-2 mt-2" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
                <span className="font-serif text-lg" style={{ color: theme.ink, fontWeight: 700 }}>Total</span>
                <span className="font-mono text-lg" style={{ color: theme.gold, fontWeight: 700 }}>{cedi(total)}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Actions" accent={theme.teal}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Btn variant="secondary" icon={Plus}>Add Items</Btn>
            <Btn variant="secondary" icon={ChefHat}>Send to Kitchen</Btn>
            <Btn variant="secondary" icon={Receipt}>Print Bill</Btn>
            <Btn variant="primary" icon={CreditCard}>Settle Tab</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
};

const WaiterMenuModule = () => {
  const [category, setCategory] = useState('mains');
  const [cart, setCart] = useState([]);
  const cats = [
    { id: 'starters', label: 'Starters', items: WAITER_MENU.starters },
    { id: 'mains', label: 'Mains', items: WAITER_MENU.mains },
    { id: 'drinks', label: 'Drinks', items: WAITER_MENU.drinks },
    { id: 'desserts', label: 'Desserts', items: WAITER_MENU.desserts },
  ];
  const items = cats.find(c => c.id === category).items;
  const cartTotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  return (
    <div style={{ background: theme.bg, minHeight: '100%' }}>
      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5">
          <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>POS · Quick Order</div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Menu</h1>
          <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>Tap items to add to current order · Tab T-211 active</div>
        </div>
        <div className="px-4 md:px-8 flex gap-1 overflow-x-auto" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
          {cats.map(c => (
            <button key={c.id} onClick={() => setCategory(c.id)} className="px-4 py-3 text-sm transition-all whitespace-nowrap"
              style={{ color: category === c.id ? theme.ink : theme.inkSoft, fontWeight: category === c.id ? 600 : 400, borderBottom: category === c.id ? `2px solid ${theme.gold}` : '2px solid transparent', marginBottom: '-1px' }}>
              {c.label} · {c.items.length}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        <div className="lg:col-span-2 px-4 md:px-8 py-4 md:py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {items.map(item => (
              <button key={item.id} onClick={() => addToCart(item)} className="p-4 text-left transition-all" style={{ background: theme.bgPanel, border: `1px solid ${theme.rule}` }}>
                <div className="font-serif" style={{ fontSize: '17px', color: theme.ink, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{item.name}</div>
                {item.prep && <div className="text-[10px] mt-1" style={{ color: theme.inkMute }}>~{item.prep} min</div>}
                <div className="text-sm mt-2 font-mono" style={{ color: theme.gold, fontWeight: 700 }}>{cedi(item.price)}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="lg:border-l px-4 md:px-6 py-4 md:py-6" style={{ background: theme.bgPanelAlt, borderLeft: `1px solid ${theme.rule}` }}>
          <div className="text-[10px] uppercase mb-3" style={{ color: theme.gold, letterSpacing: '0.18em', fontWeight: 700 }}>Current Order · Table 11</div>
          {cart.length === 0 ? (
            <div className="p-6 text-center" style={{ background: theme.bgPanel, border: `1px dashed ${theme.rule}`, color: theme.inkMute, fontSize: '13px' }}>
              Tap menu items to add
            </div>
          ) : (
            <div className="space-y-2">
              {cart.map(c => (
                <div key={c.id} className="flex items-center justify-between p-2" style={{ background: theme.bgPanel, border: `1px solid ${theme.ruleSoft}` }}>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm" style={{ color: theme.ink, fontWeight: 500 }}>{c.name}</div>
                    <div className="text-[10px]" style={{ color: theme.inkMute }}>{cedi(c.price)} × {c.qty}</div>
                  </div>
                  <div className="text-sm font-mono" style={{ color: theme.gold, fontWeight: 600 }}>{cedi(c.price * c.qty)}</div>
                </div>
              ))}
              <div className="pt-3 mt-3 flex justify-between" style={{ borderTop: `1px solid ${theme.rule}` }}>
                <span className="font-serif" style={{ fontSize: '17px', color: theme.ink, fontWeight: 600 }}>Subtotal</span>
                <span className="font-mono" style={{ fontSize: '17px', color: theme.gold, fontWeight: 700 }}>{cedi(cartTotal)}</span>
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <Btn variant="primary" icon={ChefHat}>Send to Kitchen</Btn>
                <Btn variant="ghost" onClick={() => setCart([])}>Clear</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WaiterShiftModule = () => (
  <div style={{ background: theme.bg, minHeight: '100%' }}>
    <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
      <div className="px-4 md:px-8 pt-5 md:pt-7 pb-4 md:pb-5">
        <div className="text-[10px] uppercase mb-2" style={{ color: theme.gold, letterSpacing: '0.24em', fontWeight: 700 }}>My Shift · Saturday Dinner Service</div>
        <h1 className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 34px)', color: theme.ink, letterSpacing: '-0.01em' }}>Tonight's Performance</h1>
        <div className="text-sm mt-1" style={{ color: theme.inkSoft }}>18:00 → 23:00 · 4h 32m on the floor so far</div>
      </div>
    </div>
    <div className="px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiTile label="Tables Served" value={11} sublabel="6 currently active" icon={Utensils} tone={theme.gold} />
        <KpiTile label="Total Covers" value={28} sublabel="avg ₵152/cover" icon={Users} tone={theme.teal} />
        <KpiTile label="Revenue" value={cedi(4250)} sublabel="my section" icon={DollarSign} tone={theme.leaf} />
        <KpiTile label="Tip Pool Share" value={cedi(180)} sublabel="estimated" icon={Sparkles} tone={theme.hibiscus} />
      </div>

      <Card title="My Tables Tonight" accent={theme.gold} padded={false}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${theme.rule}`, background: theme.bg }}>
              <th className="text-left py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Table</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Opened</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Closed</th>
              <th className="text-left py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Covers</th>
              <th className="text-right py-3 px-3 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Total</th>
              <th className="text-right py-3 px-5 text-[10px] uppercase" style={{ color: theme.inkMute, letterSpacing: '0.14em', fontWeight: 600 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { t: '2', o: '18:14', c: '19:48', cov: 2, tot: 312, status: 'paid' },
              { t: '7', o: '18:32', c: '20:05', cov: 4, tot: 580, status: 'paid' },
              { t: '5', o: '19:12', c: '20:38', cov: 3, tot: 412, status: 'paid' },
              { t: '12', o: '19:25', c: '20:55', cov: 2, tot: 280, status: 'paid' },
              { t: '4', o: '19:42', c: null, cov: 2, tot: 234, status: 'open' },
              { t: '11', o: '20:12', c: null, cov: 4, tot: 604, status: 'open' },
              { t: '8', o: '20:05', c: null, cov: 2, tot: 1080, status: 'open' },
              { t: '6', o: '20:18', c: null, cov: 6, tot: 530, status: 'open' },
              { t: '3', o: '20:24', c: null, cov: 1, tot: 113, status: 'open' },
              { t: '9', o: '20:30', c: null, cov: 3, tot: 24, status: 'open' },
            ].map((row, i, arr) => (
              <tr key={i} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${theme.ruleSoft}` : 'none' }}>
                <td className="py-3 px-5 font-mono" style={{ color: theme.ink, fontWeight: 600 }}>T{row.t}</td>
                <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{row.o}</td>
                <td className="py-3 px-3 text-xs" style={{ color: theme.inkSoft }}>{row.c || '—'}</td>
                <td className="py-3 px-3" style={{ color: theme.ink }}>{row.cov}</td>
                <td className="py-3 px-3 text-right font-mono" style={{ color: theme.ink }}>{cedi(row.tot)}</td>
                <td className="py-3 px-5 text-right">
                  {row.status === 'paid' ? <Pill tone="leaf" size="sm">paid</Pill> : <Pill tone="gold" size="sm">open</Pill>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="p-4 flex items-start gap-3" style={{ background: theme.tealSoft + '40', border: `1px solid ${theme.teal}30`, borderLeft: `3px solid ${theme.teal}` }}>
        <Sparkles size={16} style={{ color: theme.teal, marginTop: 2 }} />
        <div className="flex-1 text-sm">
          <span style={{ color: theme.ink, fontWeight: 600 }}>Service note: </span>
          <span style={{ color: theme.inkSoft }}>Table 8 is the Visser anniversary VIP — coordinate with Yaa for the dessert presentation. Champagne already opened. Anniversary card from GM ready at hostess stand.</span>
        </div>
      </div>
    </div>
  </div>
);

const WaiterSidebar = ({ activeNav, setActiveNav }) => (
  <aside className="hidden md:flex w-64 flex-shrink-0 flex-col" style={{ background: theme.navBg, color: '#FBF7EE' }}>
    <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <FloatLogo size="md" />
          <div className="text-[10px] mt-1" style={{ color: theme.gold, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Ghana</div>
        </div>
      </div>
    </div>
    <div className="px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium" style={{ background: theme.gold, color: theme.navBg, fontSize: '13px' }}>KA</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm" style={{ fontWeight: 500 }}>Kofi Asante</div>
          <div className="text-[10px]" style={{ color: theme.gold, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>Waiter · Floor</div>
        </div>
      </div>
    </div>
    <nav className="flex-1 px-3 py-3 overflow-y-auto">
      {WAITER_NAV.map(item => {
        const Icon = item.icon;
        const active = activeNav === item.id;
        return (
          <button key={item.id} onClick={() => setActiveNav(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 mb-0.5 transition-all text-sm"
            style={{ background: active ? 'rgba(185,135,64,0.15)' : 'transparent', color: active ? theme.gold : 'rgba(255,255,255,0.75)', borderLeft: active ? `3px solid ${theme.gold}` : '3px solid transparent', fontWeight: active ? 600 : 400 }}>
            <Icon size={15} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: theme.gold, color: theme.navBg, fontWeight: 700 }}>{item.badge}</span>}
          </button>
        );
      })}
    </nav>
    <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between text-[10px]" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <span>v1.0</span>
        <button className="hover:text-white"><LogOut size={12} /></button>
      </div>
    </div>
  </aside>
);

const WaiterTopBar = () => (
  <div className="flex items-center justify-between pl-16 pr-4 md:px-8 py-3 md:py-4" style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
    <div className="flex items-center gap-3 text-sm" style={{ color: theme.inkSoft }}>
      <Calendar size={14} /><span className="hidden md:inline">Saturday, 25 April 2026 · Dinner service · 20:38</span><span className="md:hidden">Sat 25 Apr</span>
    </div>
    <div className="flex items-center gap-3">
      <button className="relative p-2"><Bell size={15} style={{ color: theme.inkSoft }} /><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: theme.gold }} /></button>
    </div>
  </div>
);

const WaiterApp = () => {
  const [activeNav, setActiveNav] = useState('tabs');
  const [openedTab, setOpenedTab] = useState(null);
  let content;
  if (openedTab) {
    content = <WaiterTabDetailModule tab={openedTab} onBack={() => setOpenedTab(null)} />;
  } else if (activeNav === 'tabs') content = <WaiterTabsModule openTab={setOpenedTab} />;
  else if (activeNav === 'newtab') content = <WaiterMenuModule />;
  else if (activeNav === 'menu') content = <WaiterMenuModule />;
  else if (activeNav === 'shift') content = <WaiterShiftModule />;
  
  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: theme.bg, fontFamily: '"Inter", system-ui, sans-serif', color: theme.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.rule}; }
      `}</style>
      <WaiterSidebar activeNav={activeNav} setActiveNav={(id) => { setOpenedTab(null); setActiveNav(id); }} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <WaiterTopBar />
        <div className="flex-1 overflow-y-auto">{content}</div>
      </div>
    </div>
  );
};


const PERSONA_REGISTRY = [
  {
    id: 'md',
    name: "Charles Botha",
    initials: 'CB',
    role: "Managing Director",
    persona: "Owner · Board level",
    summary: "Strategic oversight only. Reads the monthly Performance Pack, approves the Annual Budget, and runs strategic reports.",
    icon: Award,
    accent: theme.gold,
    Component: MdApp,
  },
  {
    id: 'gm',
    name: "Jana Kruger",
    initials: 'JK',
    role: "General Manager",
    persona: "Daily operations · weekly reviews · reports library",
    summary: "Jana's complete workspace. Daily floor walks, approvals, channel rates and procurement; weekly F&B reviews and maintenance; monthly budget vs actuals and the full reports library.",
    icon: Briefcase,
    accent: theme.gold,
    Component: GmApp,
  },
  {
    id: 'fom',
    name: "Amani Mlangeni",
    initials: 'AM',
    role: "Front Office Manager",
    persona: "Reservations & front desk",
    summary: "Owns the guest journey from booking to check-out. Tape Chart, check-in wizard, in-house, cashier shift.",
    icon: Bed,
    accent: theme.teal,
    Component: FomApp,
  },
  {
    id: 'reception',
    name: "Kwame Boateng",
    initials: 'KB',
    role: "Receptionist",
    persona: "Front desk · transactional",
    summary: "The person at the desk. Check guests in and out, capture IDs, assign rooms, settle folios, register walk-ins. Tap-tap-tap fast.",
    icon: Key,
    accent: theme.gold,
    Component: ReceptionistApp,
  },
  {
    id: 'waiter',
    name: "Kofi Asante",
    initials: 'KA',
    role: "Waiter · POS",
    persona: "Restaurant floor · point of sale",
    summary: "On the floor. Open tabs, take orders, send to kitchen, present and settle bills. Fast iPad-style POS.",
    icon: Utensils,
    accent: theme.hibiscus,
    Component: WaiterApp,
  },
  {
    id: 'fb',
    name: "Yaa Owusu",
    initials: 'YO',
    role: "F&B Manager",
    persona: "Restaurants & bar",
    summary: "Front-of-house F&B leader. Performance dashboards, live POS, menu engineering quadrants.",
    icon: Utensils,
    accent: theme.hibiscus,
    Component: FbApp,
  },
  {
    id: 'chef',
    name: "Chef Olamide Adeyemi",
    initials: 'CO',
    role: "Executive Chef",
    persona: "Kitchen brigade",
    summary: "Back-of-house. Recipe BOMs, production sheet, theoretical-vs-actual variance, wastage log.",
    icon: ChefHat,
    accent: theme.gold,
    Component: ChefApp,
  },
  {
    id: 'hk',
    name: "Akua Mensah",
    initials: 'AK',
    role: "Executive Housekeeper",
    persona: "Rooms & linen",
    summary: "Owns room readiness. Live status board, attendant assignments, mini-bar, linen, lost & found.",
    icon: Bath,
    accent: theme.dusk,
    Component: HkApp,
  },
  {
    id: 'hr',
    name: "Aba Forson",
    initials: 'AF',
    role: "HR Manager",
    persona: "People & payroll",
    summary: "16-person roster, leave approvals, monthly Ghana statutory payroll (SSNIT, PAYE), recruitment.",
    icon: Users,
    accent: theme.leaf,
    Component: HrApp,
  },
  {
    id: 'ca',
    name: "Adriaan van der Berg",
    initials: 'AB',
    role: "Chief Accountant",
    persona: "Finance · books · compliance",
    summary: "Full Finance & Accounting. P&L, AR/AP with three-way match, bank reconciliation, JVs, tax returns.",
    icon: DollarSign,
    accent: theme.dusk,
    Component: CaApp,
  },
  {
    id: 'pm',
    name: "Kojo Asare",
    initials: 'KA',
    role: "Purchasing Manager",
    persona: "Procurement operations",
    summary: "Operational depth of procurement. PR intake, RFQ comparison, PO lifecycle, vendor performance.",
    icon: ShoppingCart,
    accent: theme.teal,
    Component: PmApp,
  },
  {
    id: 'it',
    name: "Kobi Anane",
    initials: 'KZ',
    role: "IT Manager",
    persona: "Technical backbone",
    summary: "Security, integrations, compliance. System health, MFA, audit log, backups, API keys, configuration.",
    icon: Settings,
    accent: theme.clay,
    Component: ItApp,
  }
];

const ROLE_GROUPS = [
  { id: 'leadership',  label: 'Leadership',         personas: ['md', 'gm'] },
  { id: 'operations',  label: 'Operations',         personas: ['fom', 'reception', 'fb', 'waiter', 'chef', 'hk'] },
  { id: 'support',     label: 'Support Functions',  personas: ['hr', 'ca', 'pm', 'it'] },
];

const LoginScreen = ({ onSelect }) => {
  const [hovered, setHovered] = useState(null);
  const [activeGroup, setActiveGroup] = useState('leadership');

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: theme.bg, fontFamily: '"Inter", system-ui, sans-serif', color: theme.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif !important; }
        .font-mono { font-family: 'JetBrains Mono', monospace !important; }
      `}</style>
      <div className="relative px-6 md:px-16 py-10 md:py-16" style={{ background: theme.navBg, color: '#FBF7EE' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-start gap-3 mb-10">
            <FloatLogo size="xl" />
            <div className="text-xs" style={{ color: theme.gold, letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 600 }}>Akosombo · Lake Volta · Ghana</div>
          </div>
          <div className="text-[10px] uppercase mb-3" style={{ color: theme.gold, letterSpacing: '0.28em', fontWeight: 700 }}>Hospitality Platform · v1.0.4</div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(32px, 6vw, 52px)', letterSpacing: '-0.02em', lineHeight: 1.1, maxWidth: '720px', color: '#FFFFFF' }}>
            Akwaaba. Choose your workspace.
          </h1>
          <p className="text-base mt-5 max-w-2xl" style={{ color: '#FFFFFF', lineHeight: 1.6 }}>
            14 persona-tailored workspaces. Each has its own sidebar, modules, and data threading. Click a persona to enter their workspace.
          </p>
        </div>
      </div>

      <div style={{ background: theme.bgPanel, borderBottom: `1px solid ${theme.rule}` }}>
        <div className="max-w-6xl mx-auto px-6 md:px-16 flex gap-1 overflow-x-auto">
          {ROLE_GROUPS.map(g => {
            const active = activeGroup === g.id;
            return (
              <button key={g.id} onClick={() => setActiveGroup(g.id)}
                className="px-5 py-4 transition-all"
                style={{ color: active ? theme.ink : theme.inkSoft, fontWeight: active ? 600 : 400, borderBottom: active ? `2px solid ${theme.gold}` : '2px solid transparent', marginBottom: '-1px', fontSize: '14px', letterSpacing: '0.04em' }}>
                {g.label}
                <span className="ml-2 text-[10px]" style={{ color: theme.inkMute, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>· {g.personas.length}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 px-6 md:px-16 py-8 md:py-12" style={{ background: theme.bg }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {ROLE_GROUPS.find(g => g.id === activeGroup).personas.map(pid => {
              const p = PERSONA_REGISTRY.find(x => x.id === pid);
              const Icon = p.icon;
              const isHovered = hovered === p.id;
              return (
                <button key={p.id}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onSelect(p.id)}
                  className="text-left p-6 transition-all"
                  style={{ background: theme.bgPanel, border: `1px solid ${isHovered ? p.accent : theme.rule}`, borderLeft: `3px solid ${p.accent}`, transform: isHovered ? 'translateY(-2px)' : 'translateY(0)', boxShadow: isHovered ? '0 8px 24px rgba(21,32,31,0.08)' : 'none', cursor: 'pointer' }}>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center font-medium flex-shrink-0" style={{ background: p.accent, color: '#FBF7EE', fontSize: '17px' }}>
                      {p.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase mb-1" style={{ color: p.accent, letterSpacing: '0.18em', fontWeight: 700 }}>{p.role}</div>
                      <div className="font-serif" style={{ fontSize: '22px', color: theme.ink, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{p.name}</div>
                      <div className="text-xs mt-1" style={{ color: theme.inkSoft }}>{p.persona}</div>
                    </div>
                    <Icon size={18} style={{ color: p.accent, opacity: 0.6, marginTop: 6 }} />
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: theme.inkSoft }}>{p.summary}</p>
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${theme.ruleSoft}` }}>
                    <span className="text-[10px]" style={{ color: theme.inkMute, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>Tap to enter</span>
                    <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: p.accent }}>
                      Open workspace <ArrowRight size={12} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const PersonaSwitcher = ({ onSwitch }) => (
  <button onClick={onSwitch}
    className="fixed top-3 right-3 z-50 flex items-center gap-2 px-3 py-1.5 transition-all"
    style={{ background: theme.gold, color: theme.navBg, border: `1px solid ${theme.gold}`, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
    <ArrowLeft size={12} /> Switch Persona
  </button>
);

const App = () => {
  const [active, setActive] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Close drawer when persona changes
  useEffect(() => { setDrawerOpen(false); }, [active]);
  
  if (!active) return <LoginScreen onSelect={setActive} />;
  const p = PERSONA_REGISTRY.find(x => x.id === active);
  if (!p) return <LoginScreen onSelect={setActive} />;
  const Workspace = p.Component;
  
  return (
    <>
      <style>{`
        /* Mobile drawer behavior */
        @media (max-width: 768px) {
          .platform-sidebar-wrapper aside {
            display: flex !important;
            position: fixed;
            top: 0; left: 0; bottom: 0;
            z-index: 60;
            transform: translateX(-100%);
            transition: transform 0.25s ease;
            box-shadow: 0 0 40px rgba(0,0,0,0.3);
          }
          .platform-sidebar-wrapper.drawer-open aside {
            transform: translateX(0);
          }
          .platform-drawer-overlay {
            display: none;
          }
          .platform-sidebar-wrapper.drawer-open + .platform-drawer-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            z-index: 55;
          }
        }
      `}</style>
      
      {/* Mobile-only hamburger button */}
      <button
        onClick={() => setDrawerOpen(o => !o)}
        className="md:hidden fixed top-3 left-3 z-[70] flex items-center justify-center w-10 h-10"
        style={{ background: theme.navBg, color: theme.gold, border: `1px solid ${theme.gold}`, borderRadius: 4 }}>
        {drawerOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
      
      <button
        onClick={() => setActive(null)}
        className="fixed top-3 right-3 md:top-4 md:right-6 z-[70] flex items-center gap-2 px-3 py-2 transition-all"
        style={{ background: theme.gold, color: theme.navBg, border: `1px solid ${theme.gold}`, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
        <ArrowLeft size={12} /> <span className="hidden sm:inline">Switch Persona</span><span className="sm:hidden">Switch</span>
      </button>
      
      <div className={`platform-sidebar-wrapper ${drawerOpen ? 'drawer-open' : ''}`}>
        <Workspace />
      </div>
      <div className="platform-drawer-overlay" onClick={() => setDrawerOpen(false)} />
    </>
  );
};


export default App;
