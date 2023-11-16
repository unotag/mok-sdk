import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { getUserProperty } from "../hooks/useGetUserProperty";
import { SettingsProps } from "../types";
import { setUserProperty } from "../hooks/useSetUserProperty";

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 50px;
  height: 20px;
  background: #b3b3b3;
  border-radius: 32px;
  padding: 4px;
  transition: 300ms all;
  backface-visiblity: hidden;
  :focus {
    outline: none;
  }

  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 35px;
    top: 50%;
    left: 4px;
    background: white;
    transform: translate(0, -50%);
  }
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
  :focus {
    outline: none;
  }

  &:checked + ${Switch} {
    background: green;

    &:before {
      transform: translate(32px, -50%);
    }
  }
`;

const Select = styled.select`
  width: 30%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;
  border: none;
  :focus {
    outline: none;
  }

  option {
    color: black;
    background: white;
    font-weight: small;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export const Settings = ({ baseUrl, id, readKey, writeKey }: SettingsProps) => {
  const categoryList = [
    { name: "marketing" },
    { name: "promotional" },
    { name: "transactional" },
    { name: "alerts" },
  ];

  const newCategory = categoryList.map((item: any) => ({
    allowed: true,
    region: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timeWindow: "",
    ...item,
  }));

  const [categories, setCategories] = useState(newCategory);

  const fetchUserProperties = async () => {
    const response = await getUserProperty(baseUrl, id, readKey);
    if (response.data?.allowedCategories) {
      setCategories(response.data.allowedCategories);
    }
  };

  const updateAllowedCategory = async (name: string, data: object) => {
    console.log(data);
    const newCat = categories.map((item) =>
      item.name === name ? { ...item, ...data } : { ...item }
    );
    setCategories(newCat);
    await setUserProperty(baseUrl, id, writeKey, {
      allowedCategories: newCat,
    });
    await fetchUserProperties();
  };

  useEffect(() => {
    fetchUserProperties();
  }, []);

  return (
    <div style={{ margin: "5px" }}>
      {categories.map((item: any, idx: any) => (
        <div key={idx} style={{ fontSize: "14px" }}>
          <Label>
            <span>{item.name} notification</span>
            <Input
              style={{ justifyContent: "space-between" }}
              type="checkbox"
              checked={item.allowed}
              onChange={(e: any) =>
                updateAllowedCategory(item.name, { allowed: !item.allowed })
              }
            />
            <Switch />
          </Label>
          <Label>
            Choose time window
            <Select
              value={item.timeWindow}
              name="time-window"
              id="time"
              onChange={(e) =>
                updateAllowedCategory(item.name, { timeWindow: e.target.value })
              }
            >
              <option value="">Any time</option>
              <option value="6pm-9am">6am-9am</option>
              <option value="9am-12pm">9am-12pm</option>
              <option value="12pm-8pm">12pm-8pm</option>
              <option value="8pm-12am">8pm-12am</option>
              <option value="12am-6am">12am-6am</option>
            </Select>
          </Label>
          <hr style={{ opacity: "0.5" }} />
        </div>
      ))}
    </div>
  );
};
