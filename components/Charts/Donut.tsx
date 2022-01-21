import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import ChartistGraph from "react-chartist";
import styled from "styled-components";

const ChartWrapper = styled.div`
  width: 500px;
  padding: 20px;
`;

const ChartTitle = styled.h2`
  text-align: center;
`;

const ChartNoData = styled.h3`
  text-align: center;
`

const GET_RESPONSE_COUNT = gql`
  query GetResponseCount($pollId: ID!, $minBirthDate: DateTime!, $maxBirthDate: DateTime!) {
    responses(
      where: {
        answer: { poll: { id: { equals: $pollId } } }
        user: { birthDate: { gt: $minBirthDate, lt: $maxBirthDate } }
      }
    ) {
      answer {
        text
      }
    } 
  }
`;

const Donut = ({ pollId, age }: { pollId: string, age: { min: number; max: number; } }) => {
  const [data, setData] = useState({labels: [], series: []});
  const minBirthDate = useRef(dayjs().subtract(age.max, 'year').toISOString());
  const maxBirthDate = useRef(dayjs().subtract(age.min, 'year').toISOString());
  const { data: apiData, loading } = useQuery(GET_RESPONSE_COUNT, {
    variables: {
      pollId,
      minBirthDate: minBirthDate.current,
      maxBirthDate: maxBirthDate.current
    }
  });

  useEffect(() => {
    if (!loading && apiData) {
      const { responses } = apiData;
      const counts = {};

      responses.map(response => response.answer.text).map(response => {
        counts[response] = counts[response] ? (counts[response] += 1) : 1;
      });
      const labels: string[] = Object.keys(counts);
      const series: number[] = labels.map(label => counts[label]);
      setData({ labels, series })
    }
  }, [apiData, loading]);

  if (loading) {
    return null;
  }
  
  const options = {
    width: "500px",
    height: "500px",
    labelInterpolationFnc: (value) => {
      return `${value} (${data.series[data.labels.indexOf(value)]})`
    }
  }

  const type = 'Pie'

  return (
    <ChartWrapper>
      <ChartTitle>Wyniki respondentów w wieku {age.min} - {age.max}</ChartTitle>
      <ChartistGraph data={data} options={options} type={type} />
    </ChartWrapper>
  )
};
export default Donut;