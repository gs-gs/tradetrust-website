import React, { ReactElement } from "react";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { TradeTrustERC721 } from "@govtechsg/token-registry/types/TradeTrustERC721";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { useTitleEscrowContract } from "../hooks/useTitleEscrowContract";
import { useTokenRegistryContract } from "../hooks/useTokenRegistryContract";
import { getDocumentId, getTokenRegistryAddress } from "../utils/document";
import { useInjectedProvider } from "../hooks/useInjectedProvider";

interface TokenInstanceContextType {
  titleEscrow?: TitleEscrow;
  tokenRegistryInstance?: TradeTrustERC721;
}

export const TokenInstanceContextWithSigner = React.createContext<TokenInstanceContextType>({
  titleEscrow: undefined,
  tokenRegistryInstance: undefined,
});

export const TokenInstanceProviderWithSigner = ({
  document,
  children,
}: {
  document: WrappedDocument;
  children: ReactElement;
}) => {
  const tokenId = getDocumentId(document);
  const tokenRegistryAddress = getTokenRegistryAddress(document);

  const { signer } = useInjectedProvider();
  const tokenRegistryInstance = useTokenRegistryContract(tokenRegistryAddress, signer).tokenRegistry;
  const titleEscrow = useTitleEscrowContract(tokenRegistryAddress, tokenId, signer).titleEscrow;

  return (
    <TokenInstanceContextWithSigner.Provider value={{ tokenRegistryInstance, titleEscrow }}>
      {children}
    </TokenInstanceContextWithSigner.Provider>
  );
};