import { graphql } from '~/_gql';
import { hasuraClient } from './hasura.server';

export const CREATEGIFTCARD = graphql(`
  mutation CreateGiftCard($amount: Int!, $isActive: Boolean!, $workplaceId: uuid!, $customerEmail: String) {
    insertGiftCard(
      objects: { amount: $amount, isActive: $isActive, workplaceId: $workplaceId, customerEmail: $customerEmail }
    ) {
      returning {
        id
      }
    }
  }
`);

const GETWORKPLACECARDS = graphql(`
  query GetGiftCards($workplaceId: uuid!) {
    giftCard(where: { workplaceId: { _eq: $workplaceId } }) {
      amount
      createdAt
      createdBy
      id
      isActive
      stripePaymentId
      updatedAt
      workplaceId
      customerEmail
      usageLines {
        amount
        createdAt
        createdBy
        giftCardId
        id
        updatedAt
      }
      creator {
        name
        id
        email
        imageUrl
      }
    }
  }
`);

const GETGIFTCARDBYCUSTOMERID = graphql(`
  query GetGiftCardsByCustomer($workplaceId: uuid!, $email: String) {
    giftCard(where: { workplaceId: { _eq: $workplaceId }, customerEmail: { _like: $email } }) {
      amount
      createdAt
      createdBy
      id
      isActive
      stripePaymentId
      updatedAt
      workplaceId
      customerEmail
      usageLines {
        amount
        createdAt
        createdBy
        giftCardId
        id
        updatedAt
        creator {
          email
          id
          imageUrl
          name
        }
      }
      creator {
        name
        id
        email
        imageUrl
      }
    }
  }
`);

const GETGIFTCARDBYID = graphql(`
  query GetGiftCardById($id: uuid!) {
    giftCardByPk(id: $id) {
      amount
      createdAt
      createdBy
      id
      isActive
      stripePaymentId
      updatedAt
      workplaceId
      customerEmail
      workplace {
        organization {
          imageUrl
        }
      }
      usageLines {
        amount
        createdAt
        createdBy
        giftCardId
        id
        updatedAt
        creator {
          email
          imageUrl
          name
        }
      }
      creator {
        email
        imageUrl
        name
      }
    }
  }
`);

const GETPUBLICGIFT = graphql(`
  query GetPublicGiftCardById($id: uuid!) {
    giftCardByPk(id: $id) {
      amount
      createdAt
      createdBy
      id
      isActive
      stripePaymentId
      updatedAt
      workplaceId
      customerEmail
    }
  }
`);
const INSERTGIFTCARDUSAGELINE = graphql(`
  mutation InsertGiftCardUsageLine($giftCardId: uuid!, $amount: Int!) {
    insertGiftCardUsageLine(objects: { giftCardId: $giftCardId, amount: $amount }) {
      returning {
        id
      }
    }
  }
`);

export const createGiftCard = async ({
  token,
  workplaceId,
  amount,
  isActive,
  customerEmail
}: {
  token: string;
  workplaceId: string;
  amount: number;
  isActive: boolean;
  customerEmail: string;
}) => {
  console.log(workplaceId);
  const giftCard = await hasuraClient({ token }).request(CREATEGIFTCARD, {
    amount,
    isActive,
    workplaceId,
    customerEmail: customerEmail
  });

  return giftCard.insertGiftCard?.returning[0];
};

export const getGiftCards = async ({
  workplaceId,
  token,
  customerEmail
}: {
  workplaceId: string;
  token: string;
  customerEmail?: string | null;
}) => {
  let cards;

  if (customerEmail) {
    cards = await hasuraClient({ token }).request(GETGIFTCARDBYCUSTOMERID, { workplaceId, email: customerEmail });
  } else {
    cards = await hasuraClient({ token }).request(GETWORKPLACECARDS, { workplaceId });
  }

  return cards.giftCard;
};

export type GiftCardType = Awaited<ReturnType<typeof getGiftCards>>[0];

export const getGiftCardById = async ({ id, token }: { id: string; token?: string }) => {
  const passedToken = token ? { token } : {};
  const card = await hasuraClient(passedToken).request(GETGIFTCARDBYID, {
    id
  });

  return card.giftCardByPk;
};

export const insertGiftCardUsageLine = async ({ id, token, amount }: { id: string; token: string; amount: number }) => {
  const line = await hasuraClient({ token }).request(INSERTGIFTCARDUSAGELINE, {
    giftCardId: id,
    amount
  });

  return line.insertGiftCardUsageLine?.returning[0];
};
